"use client";

import { useState, useCallback } from "react";
import {
  Star,
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Camera,
} from "lucide-react";
import styles from "./review.module.css";

const PLACE_ID = "ChIJJwTa2FO1bTkRSTaxJsTbWvY";

const PRODUCTS = [
  { id: "raw-makhana", label: "Raw Phool Makhana", emoji: "🪷" },
  { id: "makhana-cookies", label: "Makhana Cookies", emoji: "🍪" },
  { id: "dry-fruits", label: "Dry Fruits (Anjeer/Walnut)", emoji: "🥜" },
  { id: "bulk-order", label: "Bulk / B2B Order", emoji: "📦" },
  { id: "multiple", label: "Multiple Items", emoji: "🛍️" },
];

// Sentiment chips organized by product → positive/constructive
const SENTIMENT_CHIPS: Record<
  string,
  { positive: string[]; constructive: string[] }
> = {
  "raw-makhana": {
    positive: [
      "Fresh & crunchy",
      "Premium quality",
      "Great packaging",
      "Good sizing/grading",
      "Value for money",
      "Better than local stores",
      "Will order again",
      "Fast delivery",
      "Loved the taste",
    ],
    constructive: [
      "Quality was average",
      "Packaging could improve",
      "Expected bigger size",
      "Slightly overpriced",
      "Delivery was slow",
      "Hope they improve",
    ],
  },
  "makhana-cookies": {
    positive: [
      "Delicious taste",
      "Healthy & guilt-free",
      "Perfect crunch",
      "Great for snacking",
      "Kids loved it",
      "Unique product",
      "Will order again",
      "Good ingredients",
    ],
    constructive: [
      "Could be crunchier",
      "Needs more flavour",
      "Pack size is small",
      "Slightly sweet",
      "Expected better texture",
    ],
  },
  "dry-fruits": {
    positive: [
      "Fresh & premium",
      "Well-packaged",
      "Great variety",
      "Good value",
      "Loved the anjeer",
      "Walnuts were fresh",
      "Will reorder",
      "Better than market",
    ],
    constructive: [
      "Some items average",
      "Packaging needs work",
      "Mixed freshness",
      "Slightly expensive",
      "Expected better quality",
    ],
  },
  "bulk-order": {
    positive: [
      "Consistent quality",
      "Competitive pricing",
      "Timely delivery",
      "Good communication",
      "Reliable supplier",
      "Professional service",
      "Will order again",
    ],
    constructive: [
      "Delivery was delayed",
      "Quality was inconsistent",
      "Communication could improve",
      "Pricing needs revision",
    ],
  },
  multiple: {
    positive: [
      "Great variety",
      "Premium quality",
      "Friendly service",
      "Good store experience",
      "Fair pricing",
      "Will visit again",
      "Loved everything",
      "Well-organized store",
    ],
    constructive: [
      "Some items average",
      "Service could improve",
      "Limited options",
      "Store hard to find",
    ],
  },
};

export default function ReviewPage() {
  const [step, setStep] = useState<
    "products" | "rating" | "chips" | "review" | "thanks"
  >("products");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getCategory = () => {
    if (selectedProducts.length === 1) return selectedProducts[0];
    if (selectedProducts.includes("bulk-order")) return "bulk-order";
    return "multiple";
  };

  const handleChipToggle = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  // Get the right chips for the current product + rating
  const getAvailableChips = () => {
    const category = getCategory();
    const chipSet = SENTIMENT_CHIPS[category] || SENTIMENT_CHIPS["multiple"];
    if (rating >= 4) return chipSet.positive;
    if (rating === 3) return [...chipSet.positive.slice(0, 4), ...chipSet.constructive.slice(0, 3)];
    return chipSet.constructive;
  };

  const generateReview = useCallback(async () => {
    setLoading(true);
    setCopied(false);
    const category = getCategory();

    try {
      const res = await fetch("/api/review-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          product: category,
          chips: selectedChips,
          storeName: "Khirri Phool Makhana",
        }),
      });
      const data = await res.json();
      const text = data.suggestion || "";
      setEditedText(text);

      // Auto-copy to clipboard
      if (text) {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          // Clipboard access may be denied
        }
      }
    } catch {
      setEditedText("");
    } finally {
      setLoading(false);
    }
  }, [rating, selectedChips]);

  const handleRatingSelect = (value: number) => {
    setRating(value);
    setSelectedChips([]); // Reset chips when rating changes
    setStep("chips");
  };

  const handleBuildReview = async () => {
    await generateReview();
    setStep("review");
  };

  const openGoogleReview = () => {
    window.open(
      `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
      "_blank"
    );
  };

  const handlePost = async () => {
    try {
      await navigator.clipboard.writeText(editedText);
      setCopied(true);
    } catch {}
    openGoogleReview();
  };

  const regenerate = async () => {
    await generateReview();
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoText}>KHIRRI</span>
          <span className={styles.logoSub}>Phool Makhana</span>
        </div>

        {/* Step 1: What did you buy? */}
        {step === "products" && (
          <div className={styles.step}>
            <h1 className={styles.title}>How can we help?</h1>
            <p className={styles.subtitle}>What did you purchase today?</p>

            <div className={styles.productGrid}>
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductToggle(product.id)}
                  className={`${styles.productBtn} ${
                    selectedProducts.includes(product.id)
                      ? styles.productActive
                      : ""
                  }`}
                >
                  <span className={styles.productEmoji}>{product.emoji}</span>
                  <span className={styles.productLabel}>{product.label}</span>
                  {selectedProducts.includes(product.id) && (
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedProducts.length > 0 && setStep("rating")}
              disabled={selectedProducts.length === 0}
              className={styles.primaryBtn}
            >
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Rate your experience */}
        {step === "rating" && (
          <div className={styles.step}>
            <h1 className={styles.title}>Rate your experience</h1>
            <p className={styles.subtitle}>
              Tap a star to rate. Your feedback helps us improve!
            </p>

            <div className={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingSelect(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={styles.starBtn}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    size={48}
                    fill={
                      value <= (hoverRating || rating) ? "#ff6900" : "none"
                    }
                    stroke={
                      value <= (hoverRating || rating) ? "#ff6900" : "#ccc"
                    }
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>

            <p className={styles.hint}>Tap a star to continue</p>

            <button
              onClick={() => {
                setStep("products");
                setRating(0);
              }}
              className={styles.backBtn}
            >
              ← Change selection
            </button>
          </div>
        )}

        {/* Step 3: What stood out? — Chip Selection */}
        {step === "chips" && (
          <div className={styles.step}>
            <div className={styles.ratingBadge}>{rating} ★</div>
            <h1 className={styles.title}>
              {rating >= 4 ? "What did you love?" : "Tell us more"}
            </h1>
            <p className={styles.subtitle}>
              {rating >= 4
                ? "Tap what stood out in your experience:"
                : "Help us understand your experience:"}
            </p>

            <div className={styles.chipGrid}>
              {getAvailableChips().map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipToggle(chip)}
                  className={`${styles.chip} ${
                    selectedChips.includes(chip) ? styles.chipSelected : ""
                  }`}
                >
                  {selectedChips.includes(chip) && <Check size={14} />}
                  {chip}
                </button>
              ))}
            </div>

            <div className={styles.photoTip}>
              <Camera size={16} />
              <span>
                📸 Tip: Add a photo when posting on Google — it makes your
                review stand out!
              </span>
            </div>

            <button
              onClick={handleBuildReview}
              disabled={selectedChips.length === 0 || loading}
              className={styles.primaryBtn}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className={styles.spin} />
                  Writing your review...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Build My Review →
                </>
              )}
            </button>

            <button
              onClick={() => {
                setStep("rating");
                setSelectedChips([]);
              }}
              className={styles.backBtn}
            >
              ← Change rating
            </button>
          </div>
        )}

        {/* Step 4: Review Preview + Edit + Post */}
        {step === "review" && (
          <div className={styles.step}>
            <div className={styles.ratingBadge}>{rating} ★</div>
            <h1 className={styles.title}>Your review ✨</h1>
            <p className={styles.subtitle}>
              Edit freely or use as-is — it&apos;s your words!
            </p>

            <div className={styles.reviewBox}>
              <textarea
                value={editedText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                  setCopied(false);
                }}
                className={styles.reviewTextarea}
                rows={5}
                placeholder="Your review will appear here..."
              />
            </div>

            {copied && (
              <div className={styles.copiedBadge}>
                <Check size={14} />
                <span>Copied to clipboard! ✅</span>
              </div>
            )}

            <button onClick={regenerate} className={styles.regenerateBtn} disabled={loading}>
              {loading ? (
                <Loader2 size={14} className={styles.spin} />
              ) : (
                <Sparkles size={14} />
              )}
              {loading ? "Rewriting..." : "Write a different version"}
            </button>

            <div className={styles.actions}>
              <button
                onClick={handlePost}
                className={styles.primaryBtn}
                disabled={!editedText}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Open Google & Paste! →" : "Copy & Open Google"}
              </button>

              <p className={styles.stepsGuide}>
                <strong>3 simple steps:</strong>
                <br />
                1️⃣ Tap above → text copied + Google opens
                <br />
                2️⃣ Long-press in the box → tap <strong>Paste</strong> → tap{" "}
                <strong>Post</strong>
                <br />
                3️⃣ Come back here → tap <strong>&quot;I Posted It!&quot;</strong>{" "}
                🎉
              </p>

              <button
                onClick={() => setStep("thanks")}
                className={styles.secondaryBtn}
                disabled={!editedText}
              >
                <CheckCircle2 size={18} />
                I Posted It! 🎉
              </button>
            </div>

            <button
              onClick={() => setStep("chips")}
              className={styles.backBtn}
            >
              ← Change selections
            </button>
          </div>
        )}

        {/* Step 5: Thank you — no coupon */}
        {step === "thanks" && (
          <div className={styles.step}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={64} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>Thank You! 🙏</h1>
            <p className={styles.thankYouMessage}>
              Your review means the world to our small family business. It helps
              other customers find us and keeps us motivated to deliver the best
              quality makhana!
            </p>

            <a href="/shop" className={styles.primaryBtn}>
              <ShoppingBag size={18} />
              Shop Now
            </a>

            <a
              href="https://wa.me/918949359415"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
