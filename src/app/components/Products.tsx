"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import styles from "./Products.module.css";

const products = [
  {
    id: "product-raw-makhana",
    name: "Raw Phool Makhana",
    tagline: "Unroasted · Farm fresh · 200g / 500g / 1kg packs",
    type: "Best Seller",
    badge: "Best Seller",
    badgeClass: "orange",
    image:
      "/images/products/raw_makhana.png",
    imageAlt: "Khirri Raw Phool Makhana — premium handpicked fox nuts",
  },
  {
    id: "product-roasted-makhana",
    name: "Roasted Makhana Flavors",
    tagline: "Peri Peri · Cheese · Pudina · 70g / 75g packs",
    type: "Snack Range",
    badge: "New",
    badgeClass: "orange",
    image:
      "/images/products/flavored_makhana.png",
    imageAlt: "Khirri Roasted Makhana in Peri Peri, Cheese & Pudina flavors",
  },
  {
    id: "product-afghan-anjeer",
    name: "Afghan Anjeer 250g",
    tagline: "Sun-dried figs · rich in fiber · naturally sweet",
    type: "Premium Dry Fruit",
    badge: "Popular",
    badgeClass: "brown",
    image:
      "/images/products/afghan_anjeer.png",
    imageAlt: "Khirri Afghan Anjeer premium quality dried figs",
  },
  {
    id: "product-walnut",
    name: "Premium Walnut 200g",
    tagline: "Rich in Omega-3 · brain food · wholesome",
    type: "Dry Fruit",
    badge: null,
    badgeClass: null,
    image:
      "/images/products/walnut.png",
    imageAlt: "Khirri Premium Walnuts packed with Omega-3",
  },
  {
    id: "product-mixed-millet",
    name: "Mixed Millet 400g",
    tagline: "6 ancient super grains · wholesome · nutritious",
    type: "Super Grains",
    badge: "Healthy",
    badgeClass: "brown",
    image:
      "/images/products/mixed_millet.png",
    imageAlt: "Khirri Mixed Millet — 6 ancient super grains blend",
  },
  {
    id: "product-bulk",
    name: "Bulk B2B Supply",
    tagline: "Raw Makhana · 200 kg+ · wholesale pan-India delivery",
    type: "Custom Qty",
    badge: "B2B",
    badgeClass: "dark",
    image:
      "/images/makhana_bowl.png",
    imageAlt: "Bulk makhana wholesale supply from Khirri",
    featured: true,
  },
];

export default function Products() {
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
      id="products"
      className={styles.products}
      ref={sectionRef}
      aria-labelledby="products-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={`reveal ${styles.header}`}>
          <div className={styles.headerLeft}>
            <span className="section-eyebrow">Our Products</span>
            <h2 id="products-heading" className="section-title">
              Our Product Range
            </h2>
            <p className="section-subtitle">
              From premium raw Makhana to roasted snack flavors, dry fruits,
              and ancient super grains — everything your customers are looking for.
            </p>
          </div>
          <a href="#contact" className="btn btn-secondary" id="products-view-all-btn">
            All Variants
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <ul className={styles.grid} role="list">
          {products.map((product, i) => (
            <li
              key={product.id}
              id={product.id}
              className={`reveal reveal-delay-${i + 1} ${styles.card} ${product.featured ? styles.cardFeatured : ""}`}
            >
              {/* Image */}
              <div className={styles.cardImage}>
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 80vw, 25vw"
                />
                {product.badge && (
                  <span
                    className={`badge ${styles.cardBadge} ${styles[`badge${product.badgeClass}`]}`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.cardName}>{product.name}</h3>
                  <p className={styles.cardTagline}>{product.tagline}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardType}>{product.type}</span>
                  <a
                    href={`https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                    className={`btn btn-primary btn-sm ${styles.enquireBtn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`${product.id}-enquire-btn`}
                    aria-label={`Enquire about ${product.name}`}
                  >
                    <ShoppingBag size={13} />
                    {product.featured ? "Get Quote" : "Enquire"}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
