"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Truck, Clock, ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";
import type { Order } from "@/lib/types";
import styles from "./myOrders.module.css";

export default function MyOrdersContent() {
  const { isLoggedIn, phoneNumber, setAuthModalOpen, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If auth is still loading, wait.
    if (authLoading) return;

    // If not logged in, stop loading.
    if (!isLoggedIn || !phoneNumber) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await fetch(`/api/my-orders?phone=${encodeURIComponent(phoneNumber!)}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
        setError("Could not load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [isLoggedIn, phoneNumber, authLoading]);

  // Loading state
  if (authLoading || (isLoggedIn && loading)) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.loaderWrap}>
            <RefreshCw className={styles.spinner} size={32} />
            <p>Loading your orders...</p>
          </div>
        </div>
      </main>
    );
  }

  // Not logged in state
  if (!isLoggedIn) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Package size={48} />
            </div>
            <h2>View Your Orders</h2>
            <p>Login with your mobile number to view your past orders and track shipments.</p>
            <button className="btn btn-primary" onClick={() => setAuthModalOpen(true)}>
              Login / Sign Up
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Empty orders state
  if (orders.length === 0) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Package size={48} />
            </div>
            <h2>No orders yet</h2>
            <p>Looks like you haven't placed any orders with this number yet.</p>
            <Link href="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.subtitle}>Showing orders for {phoneNumber}</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.ordersList}>
          {orders.map((order) => {
            const date = new Date(order.createdAt || order.timestamp || Date.now());
            const isProcessing = order.status === "PROCESSING" || order.status === "pending";
            const isShipped = order.status === "READY_TO_SHIP" || order.status === "shipped";
            
            return (
              <div key={order.orderId || order.id} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>Order #{order.orderId}</span>
                    <span className={styles.orderDate}>
                      {date.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  
                  <div className={styles.statusBadge} data-status={isShipped ? "shipped" : "processing"}>
                    {isShipped ? <Truck size={14} /> : <Clock size={14} />}
                    {isShipped ? "Ready to Ship" : "Processing"}
                  </div>
                </div>

                <div className={styles.itemsList}>
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className={styles.item}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.image || "/images/products/khirri_makhana_original.jpg"}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemVariant}>
                          {item.weight} • Qty: {item.quantity}
                        </p>
                      </div>
                      <div className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.totalWrap}>
                    <span className={styles.totalLabel}>Total Paid:</span>
                    <span className={styles.totalValue}>{formatPrice(order.total)}</span>
                    <span className={styles.paymentMethod}>
                      via {order.paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid"}
                    </span>
                  </div>
                  
                  {order.shiprocketOrderId && (
                    <a
                      href={`https://shiprocket.co/tracking/${order.shiprocketOrderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-sm ${styles.trackBtn}`}
                    >
                      Track Order <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
