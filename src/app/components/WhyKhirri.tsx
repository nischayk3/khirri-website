"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Handshake, Award, Globe2, CheckCircle2 } from "lucide-react";
import styles from "./WhyKhirri.module.css";

const reasons = [
  {
    icon: Handshake,
    title: "Direct Farmer Sourcing",
    desc: "No middlemen — we work hand-in-hand with Bihar farmers for the best quality and price.",
    id: "why-direct-sourcing",
  },
  {
    icon: Award,
    title: "Strict Quality Grading",
    desc: "Only big, bold, clean white pops make it into a Khirri batch. Every single time.",
    id: "why-quality-grading",
  },
  {
    icon: Globe2,
    title: "Pan-India Bulk Delivery",
    desc: "Reliable supply at scale for B2B partners — from Jaipur to any corner of India.",
    id: "why-bulk-delivery",
  },
];

const certPoints = [
  "Makhana runs in our family for generations",
  "Direct traceability from farm to your shelves",
  "Moisture-tested and clean every batch",
  "Private-label and custom packaging available",
];

export default function WhyKhirri() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-khirri"
      className={styles.section}
      ref={sectionRef}
      aria-labelledby="why-khirri-heading"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Image Side */}
          <div className={`reveal ${styles.imageCol}`}>
            <div className={styles.imageStack}>
              <div className={styles.imageMain}>
                <Image
                  src="/images/bihar-makhana-farming-lotus-pond.webp"
                  alt="Lush green lotus pond — the natural habitat where Makhana grows"
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              {/* Inset second image */}
              <div className={styles.imageInset}>
                <Image
                  src="/images/premium-phool-makhana-fox-nuts-bowl.webp"
                  alt="Close-up of premium Khirri Phool Makhana fox nuts"
                  fill
                  className={styles.img}
                  sizes="200px"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`reveal reveal-delay-2 ${styles.contentCol}`}>
            <span className="section-eyebrow">Why Khirri</span>
            <h2
              id="why-khirri-heading"
              className={`section-title ${styles.heading}`}
            >
              From Our Bihar Roots
              <br />
              to Your Business
            </h2>
            <p className={styles.intro}>
              Makhana is our calling. We source directly from trusted farmers in
              Darbhanga and Mithila — the heartland of Phool Makhana cultivation —
              and pack it under our Khirri brand right here in Jaipur. This
              direct chain means superior quality, full traceability, and the
              best wholesale prices for your business.
            </p>

            {/* Reasons */}
            <ul className={styles.reasons} role="list">
              {reasons.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.id} id={r.id} className={styles.reason}>
                    <div className={styles.reasonIcon} aria-hidden="true">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className={styles.reasonTitle}>{r.title}</h3>
                      <p className={styles.reasonDesc}>{r.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Cert points */}
            <ul className={styles.certList} role="list">
              {certPoints.map((point) => (
                <li key={point} className={styles.certPoint}>
                  <CheckCircle2
                    size={16}
                    className={styles.certIcon}
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`btn btn-primary ${styles.cta}`}
              id="why-khirri-partner-btn"
            >
              Become a B2B Partner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
