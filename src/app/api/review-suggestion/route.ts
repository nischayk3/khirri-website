import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// 6 distinct writing personas for diversity
const PERSONAS = [
  {
    id: "casual-friendly",
    instruction:
      "Write like a casual, friendly Indian customer texting a friend. Short sentences, maybe one emoji. Keep it under 40 words.",
  },
  {
    id: "detail-oriented",
    instruction:
      "Write like a customer who notices details — mention specific product qualities, packaging, or freshness. 40-60 words. No emojis.",
  },
  {
    id: "short-punchy",
    instruction:
      "Write ONE powerful sentence, maximum 20 words. Punchy and direct. No fluff. Like a Google Maps quick review.",
  },
  {
    id: "storyteller",
    instruction:
      'Start with context like "I was looking for..." or "A friend recommended..." or "Tried this after seeing online...". Tell a brief story. 40-60 words.',
  },
  {
    id: "hindi-mixed",
    instruction:
      'Write in natural Hinglish — mix Hindi and English like a Jaipur local would speak. Example tone: "Bahut accha makhana, quality top-notch thi." 30-50 words.',
  },
  {
    id: "no-frills",
    instruction:
      'Write in a no-nonsense, matter-of-fact style. Short phrases separated by periods. Like: "Good quality. Fresh stock. Fair price. Will buy again." Under 25 words. No adjectives like amazing or wonderful.',
  },
];

const PRODUCT_LABELS: Record<string, string> = {
  "raw-makhana": "Raw Phool Makhana (fox nuts)",
  "makhana-cookies": "Makhana Cookies",
  "dry-fruits": "Dry Fruits (Anjeer/Walnuts)",
  "bulk-order": "Bulk / Wholesale Makhana Order",
  multiple: "Multiple makhana and dry fruit items",
};

// --- LLM Provider abstraction ---

interface LLMResult {
  text: string;
  provider: string;
}

/**
 * Try Gemini API (Google AI Studio) first.
 * Uses x-goog-api-key header for new AQ. auth keys.
 */
async function tryGemini(prompt: string): Promise<LLMResult | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 1.2,
            maxOutputTokens: 200,
            topP: 0.95,
            topK: 50,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || data.error) {
      console.warn(
        `Gemini failed (${res.status}):`,
        data.error?.message || "Unknown error"
      );
      return null;
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (text) {
      return { text: text.replace(/^["']|["']$/g, ""), provider: "gemini" };
    }

    return null;
  } catch (err) {
    console.warn("Gemini request failed:", err);
    return null;
  }
}

/**
 * Fallback: OpenCode (DeepSeek V4 Flash — free, reasoning model).
 * Handles reasoning models that put text in reasoning_content when
 * content is null due to token limits. Uses higher max_tokens.
 */
async function tryOpenCode(prompt: string): Promise<LLMResult | null> {
  const apiKey = process.env.OPENCODE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash-free",
        messages: [
          {
            role: "system",
            content:
              "You are a Google review writing assistant. Output ONLY the final review text. No thinking, no analysis, no word count, no quotes around the text. Just the review sentences directly.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 1.0,
        max_tokens: 600,
      }),
    });

    const data = await res.json();
    const choice = data?.choices?.[0];

    if (!choice) {
      console.warn("OpenCode returned no choices:", JSON.stringify(data));
      return null;
    }

    // Primary: check content field
    let text = choice.message?.content?.trim();

    // Fallback: reasoning models put the draft in reasoning_content
    if (!text && choice.message?.reasoning_content) {
      const reasoning = choice.message.reasoning_content;
      // Extract the review from reasoning — it's usually in quotes
      const quoteMatch = reasoning.match(/"([^"]{15,150})"/);
      if (quoteMatch) {
        text = quoteMatch[1];
      }
    }

    // Second fallback: reasoning_details array
    if (!text && choice.message?.reasoning_details?.[0]?.text) {
      const reasoning = choice.message.reasoning_details[0].text;
      const quoteMatch = reasoning.match(/"([^"]{15,150})"/);
      if (quoteMatch) {
        text = quoteMatch[1];
      }
    }

    if (text) {
      return {
        text: text.replace(/^["']|["']$/g, ""),
        provider: "opencode",
      };
    }

    console.warn("OpenCode returned no usable text");
    return null;
  } catch (err) {
    console.warn("OpenCode request failed:", err);
    return null;
  }
}

/**
 * Second fallback: OpenRouter (auto-routes to available free model).
 */
async function tryOpenRouter(prompt: string): Promise<LLMResult | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content:
              "You are a Google review writing assistant. Output ONLY the final review text. No thinking, no analysis, no quotes. Just the review sentences.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 1.0,
        max_tokens: 600,
      }),
    });

    const data = await res.json();
    const choice = data?.choices?.[0];

    if (!choice) {
      console.warn("OpenRouter returned no choices:", JSON.stringify(data));
      return null;
    }

    let text = choice.message?.content?.trim();

    // Handle reasoning models on OpenRouter too
    if (!text && choice.message?.reasoning) {
      const quoteMatch = choice.message.reasoning.match(/"([^"]{15,150})"/);
      if (quoteMatch) text = quoteMatch[1];
    }
    if (
      !text &&
      choice.message?.reasoning_details?.[0]?.text
    ) {
      const quoteMatch =
        choice.message.reasoning_details[0].text.match(/"([^"]{15,150})"/);
      if (quoteMatch) text = quoteMatch[1];
    }

    if (text) {
      return {
        text: text.replace(/^["']|["']$/g, ""),
        provider: "openrouter",
      };
    }

    return null;
  } catch (err) {
    console.warn("OpenRouter request failed:", err);
    return null;
  }
}

// --- Main handler ---

export async function POST(req: NextRequest) {
  try {
    const { rating, product, chips, storeName } = await req.json();

    const productLabel =
      PRODUCT_LABELS[product as string] || "makhana and dry fruits";

    // --- 1. Fetch last 15 generated reviews from Firestore as anti-examples ---
    let previousReviews: string[] = [];
    try {
      const snapshot = await db
        .collection("generated-reviews")
        .orderBy("createdAt", "desc")
        .limit(15)
        .get();

      previousReviews = snapshot.docs
        .map((doc) => doc.data().text)
        .filter(Boolean);
    } catch (err) {
      console.warn("Could not fetch previous reviews from Firestore:", err);
    }

    // --- 2. Pick a random persona ---
    const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];

    // --- 3. Build the chip context ---
    const chipContext =
      Array.isArray(chips) && chips.length > 0
        ? `The customer specifically highlighted these aspects of their experience:\n${chips.map((c: string) => `- ${c}`).join("\n")}\n\nNaturally incorporate THESE specific points into the review.`
        : "The customer did not specify particular highlights. Write a general review.";

    // --- 4. Build anti-example block ---
    const antiExampleBlock =
      previousReviews.length > 0
        ? `CRITICAL — UNIQUENESS REQUIREMENT:
The following ${previousReviews.length} reviews ALREADY EXIST for this business. Your review MUST be completely different from ALL of them — different sentence structure, different opening words, different vocabulary, different length. Do NOT reuse any phrases, sentence patterns, or descriptive words from these:

${previousReviews.map((r, i) => `${i + 1}. "${r}"`).join("\n")}

Write something that sounds NOTHING like the above.`
        : "";

    // --- 5. Rating-based tone guidance ---
    const toneGuidance =
      rating >= 4
        ? "positive and genuine — share what was good"
        : rating === 3
          ? "balanced — mention both good aspects and what could improve"
          : "honest constructive feedback — be polite but factual about what was lacking";

    // --- 6. Build the full prompt ---
    const prompt = `Write a Google review for "${storeName || "Khirri Phool Makhana"}", a makhana and dry fruits shop in Jaipur, Rajasthan.

CUSTOMER CONTEXT:
- Purchased: ${productLabel}
- Rating given: ${rating}/5 stars
- Tone: ${toneGuidance}

${chipContext}

WRITING STYLE FOR THIS REVIEW:
${persona.instruction}

${antiExampleBlock}

RULES:
- Write in FIRST PERSON as the customer
- Sound like a REAL person, not a marketing copy
- Do NOT use words like "exceptional", "unparalleled", "delightful", "impeccable" — use everyday language
- You may or may not mention the business name — vary it
- You may or may not mention "Jaipur" — vary it
- Do NOT start with "I recently" — vary your openings
- Include small imperfections that make it feel human (like a missing comma or casual phrasing)

Return ONLY the review text. No quotes, no preamble, no explanation.`;

    // --- 7. Try providers in order: Gemini → OpenCode → OpenRouter ---
    console.log(`[Review] Generating with persona: ${persona.id}`);

    let result: LLMResult | null = null;

    // Try Gemini first (best quality when credits available)
    result = await tryGemini(prompt);

    // Fallback to OpenCode DeepSeek (free)
    if (!result) {
      console.log("[Review] Gemini failed/unavailable, trying OpenCode...");
      result = await tryOpenCode(prompt);
    }

    // Fallback to OpenRouter (free auto-routing)
    if (!result) {
      console.log("[Review] OpenCode failed, trying OpenRouter...");
      result = await tryOpenRouter(prompt);
    }

    if (!result || !result.text) {
      console.error("[Review] All providers failed to generate a review");
      return NextResponse.json({
        suggestion: "",
        error: "All AI providers are temporarily unavailable. Please try again.",
      });
    }

    const suggestion = result.text;
    console.log(
      `[Review] Generated via ${result.provider}: "${suggestion.substring(0, 50)}..."`
    );

    // --- 8. Store the generated review in Firestore ---
    try {
      await db.collection("generated-reviews").add({
        text: suggestion,
        rating,
        product,
        chips: Array.isArray(chips) ? chips : [],
        persona: persona.id,
        provider: result.provider,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Could not store review in Firestore:", err);
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Review suggestion error:", error);
    return NextResponse.json(
      { suggestion: "", error: "Failed to generate review" },
      { status: 500 }
    );
  }
}
