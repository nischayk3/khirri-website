"use client";

import { useEffect, useRef } from "react";
import styles from "./SuperfoodStats.module.css";

const stats = [
  {
    id: "stat-india-share",
    value: "88%",
    label: "of the world's Makhana comes from India",
    sublabel: "Bihar alone contributes 80%+ of global supply",
  },
  {
    id: "stat-export",
    value: "$30.5M",
    label: "in exports in FY 2024–25",
    sublabel: "27% year-on-year growth in global demand",
  },
  {
    id: "stat-protein",
    value: "9.7g",
    label: "of plant protein per 100g",
    sublabel: "More protein than most nuts and seeds",
  },
  {
    id: "stat-calories",
    value: "347 kcal",
    label: "per 100g — low-calorie superfood",
    sublabel: "High in fiber, low GI — ideal for health-conscious buyers",
  },
];

export default function SuperfoodStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className={styles.section}
      ref={sectionRef}
      aria-labelledby="superfood-heading"
    >
      <div className={styles.inner}>
        <div className="container">
          <div className={`reveal ${styles.header}`}>
            <span className={`section-eyebrow ${styles.eyebrow}`}>
              Makhana by the Numbers
            </span>
            <h2
              id="superfood-heading"
              className={`section-title ${styles.heading}`}
            >
              India's #1 Superfood Export
            </h2>
            <p className={`section-subtitle ${styles.subtext}`}>
              Phool Makhana isn't just a snack — it's a billion-dollar industry
              rooted right here in Bihar. As demand grows globally, Khirri
              ensures you source the best, straight from the source.
            </p>
          </div>

          <ul className={styles.statsGrid} role="list">
            {stats.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className={`reveal reveal-delay-${i + 1} ${styles.statCard}`}
              >
                <span className={styles.statValue}>{s.value}</span>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statSublabel}>{s.sublabel}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
