"use client";

/* ============================================================
   Cart Drawer — Slides in from the right
   Shows cart items, quantity controls, free delivery progress,
   coupon input, and checkout CTA
   ============================================================ */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, Tag, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    appliedCoupon,
    discountAmount,
    deliveryCharge,
    amountForFreeDelivery,
    isFreeDelivery,
    getTotal,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    isCartOpen,
    setCartOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponMsg({ text: result.message, success: result.success });
    if (result.success) setCouponInput("");
    setTimeout(() => setCouponMsg(null), 4000);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
  };

  const freeDeliveryProgress = Math.min(
    (subtotal / 499) * 100,
    100
  );

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ""}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <ShoppingBag size={20} />
            <h2>Your Cart ({itemCount})</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptySubtext}>
              Add some healthy goodness to your cart!
            </p>
            <Link
              href="/shop"
              className="btn btn-primary"
              onClick={() => setCartOpen(false)}
            >
              <ShoppingBag size={16} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free Delivery Progress */}
            <div className={styles.deliveryProgress}>
              {isFreeDelivery ? (
                <div className={styles.deliveryUnlocked}>
                  <Truck size={16} />
                  <span>Free delivery unlocked! 🎉</span>
                </div>
              ) : (
                <>
                  <p className={styles.deliveryText}>
                    Add <strong>{formatPrice(Math.ceil(amountForFreeDelivery))}</strong> more for{" "}
                    <strong>FREE delivery</strong>
                  </p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Cart Items */}
            <ul className={styles.itemList} role="list">
              {items.map((item) => (
                <li key={item.variantId} className={styles.item}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={72}
                      height={72}
                      className={styles.itemImg}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <div>
                        <p className={styles.itemName}>{item.productName}</p>
                        <p className={styles.itemWeight}>{item.weight}</p>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.variantId)}
                        aria-label={`Remove ${item.productName}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className={styles.itemBottom}>
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          disabled={item.quantity >= 10}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coupon Code */}
            <div className={styles.couponSection}>
              {appliedCoupon ? (
                <div className={styles.couponApplied}>
                  <div className={styles.couponInfo}>
                    <Tag size={14} />
                    <span>
                      <strong>{appliedCoupon.code}</strong> — You save{" "}
                      {formatPrice(discountAmount)}
                    </span>
                  </div>
                  <button
                    className={styles.couponRemoveBtn}
                    onClick={handleRemoveCoupon}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className={styles.couponInput}>
                  <Tag size={16} className={styles.couponIcon} />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className={styles.couponField}
                  />
                  <button
                    className={styles.couponApplyBtn}
                    onClick={handleApplyCoupon}
                    disabled={!couponInput.trim()}
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponMsg && (
                <p
                  className={`${styles.couponMsg} ${
                    couponMsg.success ? styles.couponSuccess : styles.couponError
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discount}`}>
                  <span>Discount</span>
                  <span>−{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className={styles.freeLabel}>FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>{formatPrice(getTotal("prepaid"))}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className={styles.checkoutSection}>
              <Link
                href="/checkout"
                className={`btn btn-primary btn-lg ${styles.checkoutBtn}`}
                onClick={() => setCartOpen(false)}
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
              <button
                className={styles.continueShopping}
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
