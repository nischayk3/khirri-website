import type { Metadata } from "next";
import { Package, ShieldCheck, Truck, Clock, RotateCcw } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./shipping.module.css";

export const metadata: Metadata = {
  title: "Shipping Policy | Khirri Phool Makhana",
  description: "Khirri's shipping policy for domestic and bulk orders. Free delivery in Jaipur on orders above ₹2,499. Pan-India delivery in 5-7 business days.",
  alternates: { canonical: "https://khirri.com/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Shipping & Delivery Policy</h1>
            <p className={styles.heroSubtitle}>We ensure your makhana reaches you fresh, crunchy, and on time.</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.card}>
                <Package size={28} className={styles.cardIcon} />
                <h3>Free Delivery in Jaipur</h3>
                <p>Free delivery on all orders above ₹2,499 within Jaipur city limits. Same-day delivery available for orders placed before 2 PM.</p>
              </div>
              <div className={styles.card}>
                <Truck size={28} className={styles.cardIcon} />
                <h3>Pan-India Shipping</h3>
                <p>We ship to all major cities across India including Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, and more. Delivery in 5-7 business days.</p>
              </div>
              <div className={styles.card}>
                <ShieldCheck size={28} className={styles.cardIcon} />
                <h3>Moisture-Protected Packaging</h3>
                <p>All makhana is packed in moisture-proof, food-grade packaging to ensure freshness and crunch during transit.</p>
              </div>
              <div className={styles.card}>
                <Clock size={28} className={styles.cardIcon} />
                <h3>Bulk Order Logistics</h3>
                <p>Bulk orders (8kg+) are shipped via trusted logistics partners with tracking. Dispatch within 48 hours of order confirmation.</p>
              </div>
              <div className={styles.card}>
                <RotateCcw size={28} className={styles.cardIcon} />
                <h3>Easy Returns</h3>
                <p>If your order arrives damaged or incorrect, contact us within 48 hours for a full refund or replacement. We stand by our quality.</p>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h2>Shipping Charges</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order Value</th>
                    <th>Destination</th>
                    <th>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Below ₹499</td>
                    <td>All India</td>
                    <td>₹49</td>
                  </tr>
                  <tr>
                    <td>₹499 - ₹2,499</td>
                    <td>All India</td>
                    <td>₹99</td>
                  </tr>
                  <tr>
                    <td>Above ₹2,499</td>
                    <td>Within Jaipur</td>
                    <td>FREE</td>
                  </tr>
                  <tr>
                    <td>Above ₹4,999</td>
                    <td>All India</td>
                    <td>FREE</td>
                  </tr>
                  <tr>
                    <td>Bulk Orders (8kg+)</td>
                    <td>All India</td>
                    <td>As per logistics quote</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.infoBox}>
              <h2>International Shipping</h2>
              <p>For international orders, please contact us on WhatsApp for a custom shipping quote. We handle all export documentation including FSSAI certificates.</p>
            </div>

            <div className={styles.infoBox}>
              <h2>Order Tracking</h2>
              <p>Once your order is dispatched, you will receive a tracking number via email/SMS. You can track your order status in real-time.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
