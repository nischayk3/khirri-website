"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Ramesh Gupta",
    role: "Owner",
    company: "Shri Ram Namkeen, Jaipur",
    quote:
      "We've been sourcing Makhana from Khirri for 8 months now. The consistency in quality and the size of the pops is unmatched. Our customers love it and we've seen a 30% increase in snack sales.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Priya Malhotra",
    role: "Procurement Manager",
    company: "Healthy Bites Co., Delhi",
    quote:
      "Khirri's bulk supply has never let us down — even during peak seasons. Their direct Bihar sourcing means we get fresher stock compared to distributors. The pricing is competitive and the team is very responsive on WhatsApp.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Sunita Agarwal",
    role: "Founder",
    company: "NutriSnacks India, Mumbai",
    quote:
      "The private-label packaging option was a game changer for us. Khirri handled everything seamlessly — from grading to packaging. Our Makhana product is now a bestseller on our platform.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-eyebrow">What Our Partners Say</span>
          <h2 id="testimonials-heading" className="section-title">
            Trusted by Businesses Across India
          </h2>
        </div>

        <div className={styles.carousel} aria-live="polite" aria-atomic="true">
          {/* Decorative quote */}
          <div className={styles.quoteIcon} aria-hidden="true">
            <Quote size={40} />
          </div>

          <div className={styles.testimonialCard} id={t.id} key={t.id}>
            {/* Stars */}
            <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  className={styles.star}
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className={styles.quote}>"{t.quote}"</blockquote>

            <footer className={styles.author}>
              <div className={styles.authorAvatar} aria-hidden="true">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className={styles.authorName}>{t.name}</p>
                <p className={styles.authorMeta}>
                  {t.role} · {t.company}
                </p>
              </div>
            </footer>
          </div>

          {/* Navigation */}
          <div className={styles.controls}>
            <button
              onClick={prev}
              className={styles.navBtn}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className={styles.navBtn}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
