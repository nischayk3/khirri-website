"use client";

import { useState, useCallback } from "react";
import { Star, ShoppingBag, CheckCircle2, MessageCircle, Sparkles, Loader2, Copy, Check } from "lucide-react";
import styles from "./review.module.css";

const PLACE_ID = "ChIJJwTa2FO1bTkRSTaxJsTbWvY";
const PRODUCTS = [
  { id: "raw-makhana", label: "Raw Phool Makhana", emoji: "🪷" },
  { id: "makhana-cookies", label: "Makhana Cookies", emoji: "🍪" },
  { id: "dry-fruits", label: "Dry Fruits (Anjeer/Walnut)", emoji: "🥜" },
  { id: "bulk-order", label: "Bulk / B2B Order", emoji: "📦" },
  { id: "multiple", label: "Multiple Items", emoji: "🛍️" },
];

export default function ReviewPage() {
  const [step, setStep] = useState<"products" | "rating" | "review" | "thanks">("products");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
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

  const getSuggestion = useCallback(async (value: number) => {
    setLoading(true);
    setGenerating(true);
    const category = getCategory();

    try {
      const res = await fetch("/api/review-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: value,
          product: category,
          storeName: "Khirri Phool Makhana",
        }),
      });
      const data = await res.json();
      const text = data.suggestion || "";
      setEditedText(text);
      // Auto-copy to clipboard immediately
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch {}
    } catch {
      setEditedText("");
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  }, [selectedProducts]);

  const handleRatingSelect = async (value: number) => {
    setRating(value);
    await getSuggestion(value);
    setStep("review");
  };

  const openGoogleReview = () => {
    window.open(
      `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
      "_blank"
    );
  };

  const handlePost = async () => {
    // Copy text then open Google in one tap
    try {
      await navigator.clipboard.writeText(editedText);
    } catch {}
    openGoogleReview();
  };

  const regenerate = async () => {
    await getSuggestion(rating);
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
                    selectedProducts.includes(product.id) ? styles.productActive : ""
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
                  disabled={loading}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    size={48}
                    fill={value <= (hoverRating || rating) ? "#ff6900" : "none"}
                    stroke={value <= (hoverRating || rating) ? "#ff6900" : "#ccc"}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>

            <p className={styles.hint}>
              {loading ? "Generating your review..." : "Tap a star to continue"}
            </p>

            <button
              onClick={() => { setStep("products"); setRating(0); }}
              className={styles.backBtn}
            >
              ← Change selection
            </button>
          </div>
        )}

        {/* Step 3: Review + Post to Google */}
        {step === "review" && (
          <div className={styles.step}>
            <div className={styles.ratingBadge}>
              {rating} ★
            </div>
            <h1 className={styles.title}>Almost done!</h1>
            <p className={styles.subtitle}>
              {generating
                ? "✨ AI is writing a suggestion..."
                : "Your review has been auto-copied to clipboard. Just paste & submit!"}
            </p>

            <div className={styles.reviewBox}>
              {generating ? (
                <div className={styles.generating}>
                  <Loader2 size={32} className={styles.spin} />
                  <p>Writing your review...</p>
                </div>
              ) : (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className={styles.reviewTextarea}
                  rows={5}
                  placeholder="Write your review here..."
                />
              )}
            </div>

            {!generating && (
              <div className={styles.copiedBadge}>
                <Check size={14} />
                <span>{copied ? "Copied to clipboard! ✅" : "Click Post to copy & open Google"}</span>
              </div>
            )}

            {!generating && (
              <>
                <button onClick={regenerate} className={styles.regenerateBtn}>
                  <Sparkles size={14} />
                  Suggest different text
                </button>
              </>
            )}

            <div className={styles.actions}>
              <button onClick={handlePost} className={styles.primaryBtn} disabled={generating}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Open Google & Paste! →" : "Copy & Open Google"}
              </button>

              <p className={styles.stepsGuide}>
                <strong>3 simple steps:</strong><br />
                1️⃣ Tap "Open Google & Paste!" → text copied + Google opens<br />
                2️⃣ Long-press in the box → tap <strong>Paste</strong> → tap <strong>Post</strong><br />
                3️⃣ Come back here → tap <strong>"I Posted It!"</strong> for your discount 🎉
              </p>

              <button onClick={() => setStep("thanks")} className={styles.secondaryBtn} disabled={generating}>
                <CheckCircle2 size={18} />
                I Posted It! 🎉
              </button>
            </div>

            <button onClick={() => setStep("rating")} className={styles.backBtn}>
              ← Change rating
            </button>
          </div>
        )}

        {/* Step 4: Thank you */}
        {step === "thanks" && (
          <div className={styles.step}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={64} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>Thank You!</h1>
            <p className={styles.subtitle}>
              Your feedback helps us serve you better. As a token of appreciation:
            </p>

            <div className={styles.couponBox}>
              <p className={styles.couponLabel}>USE CODE</p>
              <p className={styles.couponCode}>KHIRRI10</p>
              <p className={styles.couponDesc}>10% off on your next order (max ₹150 off)</p>
            </div>

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
