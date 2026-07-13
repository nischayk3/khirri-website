"use client";

/* ============================================================
   Product Detail — Full product page with variant selector,
   image gallery, trust badges, nutrition, cross-sell
   ============================================================ */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Plus,
  Minus,
  Star,
  Clock,
  ArrowLeft,
  Package,
  Leaf,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import {
  formatPrice,
  getDiscountPercentage,
  getRetailProducts,
  SHIPPING,
} from "@/lib/products";
import type { Product, ProductVariant } from "@/lib/types";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./productDetail.module.css";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const discount = getDiscountPercentage(selectedVariant.mrp, selectedVariant.price);
  const totalPrice = selectedVariant.price * quantity;

  // Grade Logic
  const hasGrades = product.variants.some((v) => v.grade);
  const selectedGrade = selectedVariant.grade;
  const uniqueGrades = Array.from(
    new Set(product.variants.map((v) => v.grade).filter(Boolean))
  ) as string[];

  const handleGradeChange = (grade: string) => {
    const firstVariant = product.variants.find((v) => v.grade === grade);
    if (firstVariant) {
      setSelectedVariant(firstVariant);
      setQuantity(1);
    }
  };

  const displayedVariants = hasGrades
    ? product.variants.filter((v) => v.grade === selectedGrade)
    : product.variants;

  const handleAddToCart = () => {
    const nameWithGrade = selectedVariant.grade 
      ? `${product.name} - ${selectedVariant.grade}` 
      : product.name;

    addItem(
      {
        productSlug: product.slug,
        variantId: selectedVariant.variantId,
        productName: nameWithGrade,
        weight: selectedVariant.weight,
        price: selectedVariant.price,
        mrp: selectedVariant.mrp,
        image: product.image,
        packagingType: selectedVariant.packagingType,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Cross-sell products (other retail products)
  const crossSell = getRetailProducts()
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const images = product.gallery?.length ? product.gallery : [product.image];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/shop" className={styles.breadcrumbLink}>
              <ArrowLeft size={14} />
              Back to Shop
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          {/* Product Layout */}
          <div className={styles.productGrid}>
            {/* Left — Images */}
            <div className={styles.imageCol}>
              <div className={styles.mainImage}>
                <Image
                  src={images[activeImage]}
                  alt={product.imageAlt}
                  fill
                  className={styles.mainImg}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <span className={styles.productBadge}>{product.badge}</span>
                )}
                {discount > 0 && (
                  <span className={styles.discountTag}>{discount}% OFF</span>
                )}
              </div>
              {images.length > 1 && (
                <div className={styles.thumbnails}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ""}`}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        width={80}
                        height={80}
                        className={styles.thumbImg}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Product Info */}
            <div className={styles.infoCol}>
              <div className={styles.infoHeader}>
                <span className={styles.categoryTag}>{product.category.replace("-", " ")}</span>
                <h1 className={styles.productName}>{product.name}</h1>
                <p className={styles.productTagline}>{product.tagline}</p>
              </div>

              {/* Rating placeholder */}
              <div className={styles.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? "currentColor" : "none"}
                    className={i < 4 ? styles.starFilled : styles.starEmpty}
                  />
                ))}
                <span className={styles.ratingText}>4.5 / 5 · Based on customer feedback</span>
              </div>

              {/* Pricing */}
              <div className={styles.pricing}>
                <span className={styles.sellingPrice}>
                  {formatPrice(selectedVariant.price)}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className={styles.mrpPrice}>
                    {formatPrice(selectedVariant.mrp)}
                  </span>
                )}
                {discount > 0 && (
                  <span className={styles.saveBadge}>
                    Save {formatPrice(selectedVariant.mrp - selectedVariant.price)}
                  </span>
                )}
              </div>
              <p className={styles.taxNote}>Inclusive of all taxes</p>

              {/* Quality Grade Selector */}
              {hasGrades && (
                <div className={styles.variantSection}>
                  <p className={styles.variantLabel}>1. Select Quality Grade</p>
                  <div className={styles.gradeOptions}>
                    {uniqueGrades.map((grade) => (
                      <button
                        key={grade}
                        className={`${styles.gradeBtn} ${
                          selectedGrade === grade ? styles.gradeActive : ""
                        }`}
                        onClick={() => handleGradeChange(grade)}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                  {/* Show description for selected grade */}
                  {selectedVariant.gradeDescription && (
                    <p className={styles.gradeDesc}>
                      {selectedVariant.gradeDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Variant Selector */}
              {displayedVariants.length > 0 && (
                <div className={styles.variantSection}>
                  <p className={styles.variantLabel}>
                    {hasGrades ? "2. Select Size" : "Select Size"}
                  </p>
                  <div className={styles.variantOptions}>
                    {displayedVariants.map((v) => (
                      <button
                        key={v.variantId}
                        className={`${styles.variantBtn} ${
                          selectedVariant.variantId === v.variantId
                            ? styles.variantActive
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedVariant(v);
                          setQuantity(1);
                        }}
                      >
                        <span className={styles.variantWeight}>{v.weight}</span>
                        <span className={styles.variantPrice}>
                          {formatPrice(v.price)}
                        </span>
                        {v.label && (
                          <span className={styles.variantLabel2}>{v.label}</span>
                        )}
                        {v.packagingType === "transparent-pack" && (
                          <span className={styles.packType}>Transparent Pack</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className={styles.addToCartRow}>
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className={styles.qtyDisplay}>{quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className={`btn btn-primary btn-lg ${styles.addCartBtn} ${
                    added ? styles.addedState : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={added}
                >
                  <ShoppingCart size={18} />
                  {added
                    ? "Added to Cart ✓"
                    : `Add to Cart — ${formatPrice(totalPrice)}`}
                </button>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustBadges}>
                <div className={styles.trustBadge}>
                  <ShieldCheck size={16} />
                  <span>FSSAI Certified</span>
                </div>
                <div className={styles.trustBadge}>
                  <Leaf size={16} />
                  <span>Lab Tested</span>
                </div>
                <div className={styles.trustBadge}>
                  <Truck size={16} />
                  <span>
                    {totalPrice >= SHIPPING.FREE_DELIVERY_THRESHOLD
                      ? "Free Delivery"
                      : `Free Delivery ≥ ₹${SHIPPING.FREE_DELIVERY_THRESHOLD}`}
                  </span>
                </div>
                <div className={styles.trustBadge}>
                  <Clock size={16} />
                  <span>
                    Delivery in {SHIPPING.ESTIMATED_DELIVERY_DAYS.min}-
                    {SHIPPING.ESTIMATED_DELIVERY_DAYS.max} days
                  </span>
                </div>
                <div className={styles.trustBadge}>
                  <Package size={16} />
                  <span>COD Available</span>
                </div>
              </div>

              {/* Description */}
              <div className={styles.description}>
                <h2 className={styles.sectionHeading}>About this Product</h2>
                <p>{product.description}</p>
              </div>

              {/* Highlights */}
              {product.highlights && (
                <div className={styles.highlights}>
                  <h2 className={styles.sectionHeading}>Key Highlights</h2>
                  <ul className={styles.highlightList}>
                    {product.highlights.map((h) => (
                      <li key={h} className={styles.highlightItem}>
                        <CheckCircle2 size={16} className={styles.checkIcon} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition */}
              {product.nutrition && (
                <div className={styles.nutrition}>
                  <h2 className={styles.sectionHeading}>Nutrition Facts</h2>
                  <div className={styles.nutritionGrid}>
                    {product.nutrition.map((n) => (
                      <div key={n.label} className={styles.nutritionItem}>
                        <span className={styles.nutritionLabel}>{n.label}</span>
                        <span className={styles.nutritionValue}>{n.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cross-sell */}
          {crossSell.length > 0 && (
            <section className={styles.crossSell}>
              <h2 className={`section-title ${styles.crossSellTitle}`}>
                You Might Also Like
              </h2>
              <div className={styles.crossSellGrid}>
                {crossSell.map((p) => {
                  const v = p.variants[0];
                  return (
                    <Link
                      key={p.slug}
                      href={`/product/${p.slug}`}
                      className={styles.crossCard}
                    >
                      <div className={styles.crossImage}>
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          className={styles.crossImg}
                          sizes="200px"
                        />
                      </div>
                      <div className={styles.crossInfo}>
                        <p className={styles.crossName}>{p.name}</p>
                        <div className={styles.crossPricing}>
                          <span className={styles.crossPrice}>
                            {formatPrice(v.price)}
                          </span>
                          {v.mrp > v.price && (
                            <span className={styles.crossMrp}>
                              {formatPrice(v.mrp)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
