"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import styles from "./success.module.css";
import { useAuth } from "@/lib/auth";

function SuccessUI() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <CheckCircle size={64} className={styles.icon} />
          </div>
          
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.subtitle}>
            Thank you for shopping with Khirri. Your order has been successfully placed and is being processed.
          </p>

          {orderId && (
            <div className={styles.orderBox}>
              <span className={styles.orderLabel}>Order ID</span>
              <span className={styles.orderValue}>{orderId}</span>
            </div>
          )}

          <div className={styles.actions}>
            {isLoggedIn ? (
              <Link href="/my-orders" className={`btn btn-primary ${styles.btn}`}>
                <Package size={18} />
                View My Orders
              </Link>
            ) : null}
            
            <Link href="/shop" className={`btn ${isLoggedIn ? 'btn-outline' : 'btn-primary'} ${styles.btn}`}>
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessContent() {
  return (
    <Suspense fallback={<div className={styles.main}>Loading...</div>}>
      <SuccessUI />
    </Suspense>
  );
}
