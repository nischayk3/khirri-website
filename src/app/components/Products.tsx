"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Eye } from "lucide-react";
import { products, getFeaturedProducts, formatPrice, getDefaultVariant } from "@/lib/products";
import { useCart } from "@/lib/cart";
import styles from "./Products.module.css";
import type { Product } from "@/lib/types";

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedProducts();
  const bulkB2B = products.find((p) => p.slug === "bulk-supply");
  const displayProducts = bulkB2B ? [...featured, bulkB2B] : featured;

  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

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

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = getDefaultVariant(product);
    addItem({
      productSlug: product.slug,
      variantId: variant.variantId,
      productName: product.name,
      weight: variant.weight,
      price: variant.price,
      mrp: variant.mrp,
      image: product.image,
      packagingType: variant.packagingType,
    });
    
    setAddedItems((prev) => ({ ...prev, [product.slug]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.slug]: false }));
    }, 1500);
  };

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
              and cookies — everything your customers are looking for.
            </p>
          </div>
          <Link href="/shop" className="btn btn-secondary" id="products-view-all-btn">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <ul className={styles.grid} role="list">
          {displayProducts.map((product, i) => {
            const variant = getDefaultVariant(product);
            const isB2B = product.isB2BOnly;
            const added = addedItems[product.slug];

            return (
              <li
                key={product.slug}
                className={`reveal reveal-delay-${(i % 4) + 1} ${styles.card} ${isB2B ? styles.cardFeatured : ""}`}
              >
                <Link href={isB2B ? "#contact" : `/product/${product.slug}`} className={styles.cardLink}>
                  {/* Image */}
                  <div className={styles.cardImage}>
                    <Image
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      fill
                      className={styles.img}
                      sizes="(max-width: 768px) 80vw, 25vw"
                      priority={i < 4}
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
                      {!isB2B ? (
                        <>
                          <div className={styles.pricing}>
                            <span className={styles.price}>{formatPrice(variant.price)}</span>
                            {variant.mrp > variant.price && (
                              <span className={styles.mrp}>{formatPrice(variant.mrp)}</span>
                            )}
                          </div>
                          <button
                            className={`btn btn-primary btn-sm ${styles.enquireBtn} ${added ? styles.addedBtn : ""}`}
                            onClick={(e) => handleAddToCart(e, product)}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <ShoppingBag size={13} />
                            {added ? "Added ✓" : "Add"}
                          </button>
                        </>
                      ) : (
                        <>
                          <span className={styles.cardType}>B2B Supply</span>
                          <span className={`btn btn-primary btn-sm ${styles.enquireBtn}`}>
                            <Eye size={13} />
                            Enquire
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
