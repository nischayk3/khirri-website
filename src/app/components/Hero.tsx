"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShoppingBag, FileText, ShieldCheck, ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";

const stats = [
  { value: "100%", label: "Raw & Natural" },
  { value: "Pan-India", label: "Bulk Delivery" },
  { value: "Direct", label: "Farm Sourcing" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className={styles.hero}
      ref={heroRef}
      aria-labelledby="hero-heading"
    >
      {/* Decorative background */}
      <div className={styles.heroBg} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        {/* Left — Content */}
        <div className={styles.content}>
          <div className={`badge badge-brown reveal ${styles.badge}`}>
            <MapPin size={13} />
            Sourced from Bihar · Crafted in Jaipur
          </div>

          <h1
            id="hero-heading"
            className={`section-title reveal reveal-delay-1 ${styles.heading}`}
          >
            Premium Raw Makhana,
            <br />
            <span className={styles.headingAccent}>Straight From</span>
            <br />
            Our Family Farms
          </h1>

          <p className={`reveal reveal-delay-2 ${styles.subtext}`}>
            Khirri delivers hand-selected, large-grade Phool Makhana (fox nuts)
            sourced directly from farmers in Bihar — the heartland of India's
            makhana cultivation. Trusted by businesses across India for
            unmatched quality, purity, and consistent bulk supply.
          </p>

          <div className={`reveal reveal-delay-3 ${styles.ctaRow}`}>
            <Link
              href="/shop"
              className="btn btn-primary btn-lg"
              id="hero-shop-now-cta"
            >
              <ShoppingBag size={18} />
              Shop Now
            </Link>
            <Link
              href="/#products"
              className="btn btn-secondary btn-lg"
              id="hero-view-products-cta"
            >
              <FileText size={18} />
              View Products
            </Link>
          </div>

          <div className={`reveal reveal-delay-4 ${styles.statsRow}`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.statItem}>
                {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div className={`reveal reveal-delay-2 ${styles.imageWrapper}`}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/premium-phool-makhana-fox-nuts-bowl.webp"
              alt="Premium raw Phool Makhana fox nuts displayed beautifully"
              width={600}
              height={500}
              className={styles.heroImage}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Floating badge */}
          <div className={styles.floatingCard} aria-label="FSSAI Certified quality">
            <div className={styles.floatingCardIcon} aria-hidden="true">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className={styles.floatingCardTitle}>FSSAI Certified</p>
              <p className={styles.floatingCardSub}>100% Natural · No Preservatives</p>
            </div>
          </div>

          {/* Decorative blob */}
          <div className={styles.imageBlob} aria-hidden="true" />
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#trust-bar" className={styles.scrollHint} aria-label="Scroll down">
        <ArrowDown size={18} className={styles.scrollIcon} />
      </a>
    </section>
  );
}
