import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyA6ZneWjFui4lUL6BSQ8Q8kBrlu2U2Kz2o";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { rating, product, storeName } = await req.json();

    const productLabels: Record<string, string> = {
      "raw-makhana": "Raw Phool Makhana (fox nuts)",
      "makhana-cookies": "Makhana Cookies (made with 60% makhana flour)",
      "dry-fruits": "Dry Fruits (Afghan Anjeer / Premium Walnuts / Mixed Millet)",
      "bulk-order": "Bulk / B2B Wholesale Order",
      "multiple": "Multiple items",
    };

    const productLabel = productLabels[product as string] || "makhana and dry fruits";

    const ratingGuidance = rating >= 4
      ? "enthusiastic, mentions quality/freshness/grading/service"
      : rating === 3
        ? "balanced, mentions what was good AND what could reasonably improve"
        : "polite constructive feedback — focus on what could be better without being harsh, mention the issue factually";

    const prompt = `You are a helpful assistant for an Indian makhana (fox nuts) shop named "${storeName || 'Khirri'}" in Jaipur, Rajasthan.

A customer rated their experience ${rating} out of 5 stars for purchasing: ${productLabel}.

Write a NATURAL, genuine-sounding Google review in FIRST PERSON that:
- Reflects the rating level ${rating}/5 honestly
- Tone: ${ratingGuidance}
- Naturally includes the business name "${storeName || 'Khirri'}" and "Jaipur" if it flows naturally
- Sounds like a real customer — use conversational language, not marketing speak
- Is 1-3 sentences, around 30-60 words

IMPORTANT: Return ONLY the review text. No preamble, no quotes, no explanation. Just 1-3 sentences of review.`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 150,
          topP: 0.9,
        },
      }),
    });

    const data = await response.json();

    let suggestion = "";
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      suggestion = data.candidates[0].content.parts[0].text.trim();
    } else {
      suggestion = getFallbackSuggestion(rating, product);
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Review suggestion error:", error);
    return NextResponse.json({
      suggestion: getFallbackSuggestion(5, "multiple"),
    });
  }
}

function getFallbackSuggestion(rating: number, product: string): string {
  const templates: Record<string, Record<number, string>> = {
    "raw-makhana": {
      5: "Loved the premium quality of raw Phool Makhana from Khirri! The suta grading is transparent and the freshness is unmatched. Highly recommend for authentic Bihar-sourced makhana in Jaipur.",
      4: "Great quality raw makhana from Khirri. Good grading and fresh stock. Will definitely order again.",
      3: "Decent quality raw makhana. Could improve on packaging but overall satisfied with the product.",
      2: "The makhana quality was average. Expected better grading consistency for the price. Hope they improve.",
      1: "Was not satisfied with the makhana quality this time. The grading wasn't as expected. Hope they address this.",
    },
    "makhana-cookies": {
      5: "The makhana cookies from Khirri are delicious! Made with 60% makhana flour, they're healthy and tasty. Perfect guilt-free snack. Highly recommend!",
      4: "Really good makhana cookies! Healthy, tasty, and great for evening snacks.",
      3: "Cookies are good but could be crunchier. Nice healthy alternative though.",
      2: "The cookies were okay but didn't taste as fresh. Expected better quality for the price.",
      1: "Wasn't happy with the cookies. They lacked crunch and flavor. Hope improvements are made.",
    },
    "dry-fruits": {
      5: "Premium quality dry fruits from Khirri! The Afghan Anjeer and walnuts are fresh and well-packaged. Best dry fruits shop in Vaishali Nagar, Jaipur!",
      4: "Good quality dry fruits. Fresh stock and fair pricing. Will visit again.",
      3: "OK quality dry fruits. Could be better but acceptable for the price.",
      2: "The dry fruits were average quality. Some items didn't taste fresh. Room for improvement.",
      1: "Not happy with the dry fruit quality. Expected better for the price paid.",
    },
    "bulk-order": {
      5: "Best bulk Makhana supplier in Jaipur! Khirri provided excellent quality at competitive wholesale prices. Timely delivery and great communication.",
      4: "Good bulk makhana supply. Quality was consistent and delivery was on time.",
      3: "Adequate bulk supply. Met basic expectations but room for improvement.",
      2: "The bulk order was okay but delivery was delayed. Quality was mixed. They need to improve consistency.",
      1: "Disappointed with the bulk order. Quality issues and delayed delivery. Hope they fix these issues.",
    },
    "multiple": {
      5: "Khirri is my go-to shop for makhana and dry fruits in Jaipur! Great variety, premium quality, and excellent customer service. Highly recommend visiting their Vaishali Nagar store.",
      4: "Good experience shopping at Khirri. Nice product range and quality. Will visit again.",
      3: "Average experience. Products were OK but service could be improved.",
      2: "Mixed experience at Khirri. Some products were good, others not so much. Hope they work on consistency.",
      1: "Not a great experience. Products and service both need improvement. Hope things get better.",
    },
  };

  const productTemplates = templates[product as string];
  return productTemplates?.[rating] || templates["multiple"]?.[rating] || "";
}
