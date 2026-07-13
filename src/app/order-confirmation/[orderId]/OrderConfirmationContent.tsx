"use client";

/* ============================================================
   Order Confirmation — Success page after order placement
   ============================================================ */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  ShoppingBag,
  Share2,
  Copy,
  Heart,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./orderConfirmation.module.css";

interface OrderItem {
  name: string;
  weight: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  shipping: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  codSurcharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

export default function OrderConfirmationContent() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("khirri-last-order");
      if (raw) {
        setOrder(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsAppMsg = order
    ? encodeURIComponent(
        `Hi Khirri! I just placed order #${order.orderId}. Please confirm and share tracking details.\n\nName: ${order.shipping.fullName}\nPhone: ${order.shipping.phone}`
      )
    : "";

  if (!order) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className="container">
            <div className={styles.notFound}>
              <Package size={48} strokeWidth={1} />
              <h1>No order found</h1>
              <p>This order might have already been viewed or the session expired.</p>
              <Link href="/shop" className="btn btn-primary btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Success Hero */}
          <div className={styles.successHero}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={56} />
            </div>
            <h1 className={styles.successTitle}>Order Placed Successfully! 🎉</h1>
            <p className={styles.successSubtitle}>
              Thank you for choosing Khirri, {order.shipping.fullName.split(" ")[0]}!
              {order.paymentMethod === "cod"
                ? " Your cash-on-delivery order has been confirmed."
                : " Your payment has been received."}
            </p>
          </div>

          <div className={styles.contentGrid}>
            {/* Order Details Card */}
            <div className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <p className={styles.orderIdLabel}>Order ID</p>
                  <div className={styles.orderId}>
                    <span>#{order.orderId}</span>
                    <button
                      className={styles.copyBtn}
                      onClick={copyOrderId}
                      aria-label="Copy order ID"
                    >
                      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className={styles.orderStatus}>
                  <span className={styles.statusBadge}>
                    {order.paymentMethod === "cod" ? "COD Confirmed" : "Paid ✓"}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className={styles.itemsSection}>
                <h2 className={styles.sectionTitle}>Items Ordered</h2>
                <ul className={styles.itemList}>
                  {order.items.map((item, i) => (
                    <li key={i} className={styles.item}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className={styles.itemImg}
                        />
                      </div>
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>
                          {item.name} × {item.quantity}
                        </p>
                        <p className={styles.itemWeight}>{item.weight}</p>
                      </div>
                      <p className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className={styles.summarySection}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                    <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                    <span>−{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>
                    {order.deliveryCharge === 0 ? (
                      <span className={styles.free}>FREE</span>
                    ) : (
                      formatPrice(order.deliveryCharge)
                    )}
                  </span>
                </div>
                {order.codSurcharge > 0 && (
                  <div className={styles.summaryRow}>
                    <span>COD Fee</span>
                    <span>{formatPrice(order.codSurcharge)}</span>
                  </div>
                )}
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className={styles.addressSection}>
                <h2 className={styles.sectionTitle}>Delivering To</h2>
                <p className={styles.addressName}>{order.shipping.fullName}</p>
                <p className={styles.addressText}>
                  {order.shipping.addressLine1}
                  {order.shipping.addressLine2 && `, ${order.shipping.addressLine2}`}
                  <br />
                  {order.shipping.city}, {order.shipping.state} — {order.shipping.pincode}
                </p>
                <p className={styles.addressPhone}>📱 +91 {order.shipping.phone}</p>
              </div>

              {/* Delivery Info */}
              <div className={styles.deliveryInfo}>
                <Truck size={18} />
                <div>
                  <p className={styles.deliveryTitle}>Estimated Delivery</p>
                  <p className={styles.deliveryDays}>{order.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className={styles.actionsCol}>
              {/* WhatsApp Tracking */}
              <div className={styles.actionCard}>
                <MessageCircle size={24} className={styles.actionIcon} />
                <h3 className={styles.actionTitle}>Track on WhatsApp</h3>
                <p className={styles.actionText}>
                  Send us your order ID and get live tracking updates on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/918949359415?text=${whatsAppMsg}`}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <MessageCircle size={16} />
                  Message Us on WhatsApp
                </a>
              </div>

              {/* Continue Shopping */}
              <div className={styles.actionCard}>
                <ShoppingBag size={24} className={styles.actionIcon} />
                <h3 className={styles.actionTitle}>Continue Shopping</h3>
                <p className={styles.actionText}>
                  Discover more healthy products from our range.
                </p>
                <Link
                  href="/shop"
                  className="btn btn-secondary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <ShoppingBag size={16} />
                  Browse Products
                </Link>
              </div>

              {/* Share */}
              <div className={styles.actionCard}>
                <Heart size={24} className={styles.actionIcon} />
                <h3 className={styles.actionTitle}>Love Khirri?</h3>
                <p className={styles.actionText}>
                  Share us with your friends and family! Use code <strong>KHIRRI10</strong> for 10% off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
