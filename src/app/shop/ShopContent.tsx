"use client";

/* ============================================================
   Shop Content — Product listing with category filters,
   add to cart, trust badges, and responsive grid
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Tag,
  Filter,
  Eye,
} from "lucide-react";
import { getRetailProducts, getCategories, formatPrice, getDiscountPercentage, getDefaultVariant } from "@/lib/products";
import { useCart } from "@/lib/cart";
import type { Product, ProductCategory } from "@/lib/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./shop.module.css";

export default function ShopContent() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const products = getRetailProducts();
  const categories = getCategories();
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <>
      <Navbar />
      <main className={styles.main} ref={sectionRef}>
        {/* Hero Banner */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className="section-eyebrow">Shop Online</span>
              <h1 className={`section-title ${styles.heroTitle}`}>
                Healthy Snacks,<br />
                <span className={styles.heroAccent}>Delivered Fresh</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Lab-tested, FSSAI certified products. Free delivery on orders ≥ ₹499.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className={styles.trustStrip}>
          <div className="container">
            <div className={styles.trustItems}>
              <div className={styles.trustItem}>
                <ShieldCheck size={18} />
                <span>FSSAI Certified</span>
              </div>
              <div className={styles.trustItem}>
                <Truck size={18} />
                <span>Free Delivery ≥ ₹499</span>
              </div>
              <div className={styles.trustItem}>
                <Tag size={18} />
                <span>Use KHIRRI10 for 10% Off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className={styles.filters}>
          <div className="container">
            <div className={styles.filterRow}>
              <Filter size={16} className={styles.filterIcon} />
              <button
                className={`${styles.filterBtn} ${activeCategory === "all" ? styles.filterActive : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`${styles.filterBtn} ${activeCategory === cat.value ? styles.filterActive : ""}`}
                  onClick={() => setActiveCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className={styles.productsSection}>
          <div className="container">
            <div className={styles.grid}>
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* B2B CTA */}
        <section className={styles.b2bSection}>
          <div className="container">
            <div className={styles.b2bCard}>
              <div>
                <h2 className={styles.b2bTitle}>Looking for Bulk / B2B Orders?</h2>
                <p className={styles.b2bText}>
                  8kg, 10kg, 25kg+ sacks with wholesale pricing. Custom packaging & white-label available.
                </p>
              </div>
              <a
                href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20bulk%20Makhana."
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get B2B Quote
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ── Product Card ─────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const defaultVariant = getDefaultVariant(product);
  const discount = getDiscountPercentage(defaultVariant.mrp, defaultVariant.price);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productSlug: product.slug,
      variantId: defaultVariant.variantId,
      productName: product.name,
      weight: defaultVariant.weight,
      price: defaultVariant.price,
      mrp: defaultVariant.mrp,
      image: product.image,
      packagingType: defaultVariant.packagingType,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1} ${styles.card}`}
    >
      <Link href={`/product/${product.slug}`} className={styles.cardLink}>
        {/* Image */}
        <div className={styles.cardImage}>
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className={styles.cardImg}
            sizes="(max-width: 768px) 80vw, 25vw"
            priority={index < 4}
          />
          {product.badge && (
            <span className={`${styles.cardBadge} ${styles[`badge${product.badgeClass}`]}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className={styles.discountBadge}>
              {discount}% OFF
            </span>
          )}
          {/* Quick view overlay */}
          <div className={styles.cardOverlay}>
            <span className={styles.viewBtn}>
              <Eye size={16} />
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.cardBody}>
          <h3 className={styles.cardName}>{product.name}</h3>
          <p className={styles.cardTagline}>{product.tagline}</p>

          {/* Pricing */}
          <div className={styles.cardPricing}>
            <span className={styles.cardPrice}>{formatPrice(defaultVariant.price)}</span>
            {defaultVariant.mrp > defaultVariant.price && (
              <span className={styles.cardMrp}>{formatPrice(defaultVariant.mrp)}</span>
            )}
            {product.variants.length > 1 && (
              <span className={styles.cardVariants}>
                {product.variants.length} sizes
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className={styles.cardActions}>
        <button
          className={`btn btn-primary btn-sm ${styles.addToCartBtn} ${added ? styles.addedBtn : ""}`}
          onClick={handleAddToCart}
          disabled={added}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={14} />
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
