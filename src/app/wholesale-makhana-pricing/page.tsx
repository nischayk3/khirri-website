import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, Phone, Package, ShieldCheck, Award, Truck } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Wholesale Makhana Price — Bulk Rates per Kg | Khirri",
  description: "Transparent wholesale makhana pricing from Khirri. 4 Suta from ₹900/kg, 5+ Suta from ₹1,100/kg, 6+ Jumbo from ₹1,400/kg. Volume discounts available. FSSAI certified.",
  alternates: { canonical: "https://khirri.com/wholesale-makhana-pricing" },
};

const tiers = [
  { volume: "8 kg (1 sack)", discount: "Base Price", badge: "Starter" },
  { volume: "25 kg", discount: "5% off", badge: "Small Business" },
  { volume: "50 kg", discount: "8% off", badge: "Popular" },
  { volume: "100 kg", discount: "12% off", badge: "Best Value" },
  { volume: "500 kg+", discount: "Custom Quote", badge: "Enterprise" },
];

export default function WholesalePricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Package size={14} /> B2B Wholesale</span>
            <h1 className={styles.heroTitle}>Bulk Makhana Pricing<br /><span className={styles.highlight}>Transparent & Competitive</span></h1>
            <p className={styles.heroSub}>No middlemen. No hidden charges. GST invoice included with every order.</p>
            <div className={styles.heroCta}>
              <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <MessageCircle size={18} /> Get Live Quote
              </a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>
                <Phone size={18} /> +91 89493 59415
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Makhana Wholesale Price List</h2>
            <p className={styles.sectionSub}>Hand-graded, FSSAI certified, direct from Bihar farms. Prices are per kg.</p>

            <div className={styles.priceTable}>
              <div className={styles.priceRowHeader}>
                <span className={styles.colGrade}>Grade</span>
                <span className={styles.colSize}>Size</span>
                <span className={styles.colDesc}>Best For</span>
                <span className={styles.colPrice}>Price/kg</span>
              </div>
              {[
                { grade: "4 Suta", size: "12-14mm", desc: "Commercial, flavored makhana", price: "₹900" },
                { grade: "4+ Suta", size: "14-24mm", desc: "Mid-range retail, hotels", price: "₹1,000" },
                { grade: "5+ Suta", size: "15-19mm", desc: "Premium retail, export quality", price: "₹1,100" },
                { grade: "6+ Suta Jumbo", size: "19mm+", desc: "Luxury retail, export grade", price: "₹1,400" },
                { grade: "Makhana Cookies", size: "Jar (250g)", desc: "Cafes, bakeries, retail", price: "₹250/unit" },
              ].map((row) => (
                <div key={row.grade} className={styles.priceRow}>
                  <span className={styles.colGrade}><strong>{row.grade}</strong></span>
                  <span className={styles.colSize}>{row.size}</span>
                  <span className={styles.colDesc}>{row.desc}</span>
                  <span className={styles.colPrice}><span className={styles.priceVal}>{row.price}</span></span>
                </div>
              ))}
            </div>

            <div className={styles.volumeSection}>
              <h3>Volume Discount Tiers</h3>
              <div className={styles.volumeGrid}>
                {tiers.map((t) => (
                  <div key={t.volume} className={styles.volumeCard}>
                    <span className={styles.volumeBadge}>{t.badge}</span>
                    <span className={styles.volumeAmt}>{t.volume}</span>
                    <span className={styles.volumeDisc}>{t.discount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.trustStrip}>
              <div className={styles.trustItem}><ShieldCheck size={18} /> FSSAI Certified</div>
              <div className={styles.trustItem}><Award size={18} /> GST Invoice</div>
              <div className={styles.trustItem}><Truck size={18} /> Pan-India Delivery</div>
              <div className={styles.trustItem}><Package size={18} /> Moisture-Proof Packing</div>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What Buyers Say</h2>
            <div className={styles.testGrid}>
              {[
                { text: "We've been sourcing makhana from Khirri for 8 months. The consistency in quality is unmatched.", author: "— Snack Brand Owner, Delhi" },
                { text: "Best bulk makhana supplier in Jaipur. Fair pricing, timely delivery, and quality reports with every batch.", author: "— Namkeen Shop, Vaishali Nagar" },
                { text: "Their 6+ Jumbo grade is perfect for our premium retail line. Customers love the size and freshness.", author: "— Health Food Brand, Mumbai" },
              ].map((t, i) => (
                <div key={i} className={styles.testCard}>
                  <p className={styles.testText}>{t.text}</p>
                  <p className={styles.testAuthor}>{t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>How to Order Bulk Makhana</h2>
            <div className={styles.stepsGrid}>
              {[
                { step: "1", title: "Select Grade", desc: "Choose your preferred suta grade (4, 5+, or 6+ Jumbo) based on your needs." },
                { step: "2", title: "Choose Volume", desc: "Select your quantity from our volume discount tiers above." },
                { step: "3", title: "Get Quote", desc: "WhatsApp us for today's live pricing and delivery timeline." },
                { step: "4", title: "Order Confirmed", desc: "We dispatch within 48 hours. Track your shipment in real-time." },
              ].map((s) => (
                <div key={s.step} className={styles.stepCard}>
                  <span className={styles.stepNum}>{s.step}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Get Today&apos;s Live Wholesale Pricing</h2>
            <p>Send us your requirements and we&apos;ll respond within 2 hours with pricing, availability, and delivery timeline.</p>
            <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              <MessageCircle size={20} />
              Enquire on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
