import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Makhana Price in Jaipur Today | Raw Makhana Rate per Kg July 2026 | Khirri",
  description: "Latest makhana price in Jaipur — ₹900/kg for 4 Suta, ₹1,100/kg for 5+ Suta, ₹1,400/kg for 6+ Jumbo. Current wholesale rates from Khirri, Vaishali Nagar, Jaipur. Call +91 89493 59415.",
  alternates: { canonical: "https://khirri.com/jaipur-makhana-price-guide" },
  keywords: ["makhana price jaipur", "raw makhana rate jaipur", "phool makhana price jaipur today", "makhana cost per kg jaipur", "makhana wholesale rate jaipur", "makhana mandi price jaipur", "fox nuts price jaipur"],
};

const faqData = [
  { q: "What is today's makhana price in Jaipur?", a: "As of July 2026, Khirri's wholesale makhana price in Jaipur is ₹900/kg for 4 Suta (commercial), ₹1,100/kg for 5+ Suta (premium), and ₹1,400/kg for 6+ Suta (jumbo export grade). Retail prices for 250g packs start at ₹300." },
  { q: "Why do makhana prices vary in Jaipur?", a: "Prices vary based on suta grade (size), seasonality (new crop arrives July-September), and supply chain layers. Buying directly from a Jaipur-based supplier like Khirri eliminates middlemen markups." },
  { q: "Where can I buy makhana in Jaipur?", a: "Visit Khirri at AA-7, Nursery Cir, Vaishali Nagar, Jaipur. We also deliver across Jaipur and ship pan-India. Call +91 89493 59415 for bulk orders." },
  { q: "Is makhana cheaper in Jaipur than other cities?", a: "Jaipur prices are competitive since Rajasthan has strong dry fruit trading networks. However, buying directly from a Bihar-sourcing supplier like Khirri in Jaipur often beats local distributor prices." },
];

export default function JaipurMakhanaPriceGuide() {
  const schemas = [
    breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Makhana Price Jaipur", url: "/jaipur-makhana-price-guide" }]),
    localBusinessSchema({ city: "Jaipur", state: "Rajasthan", description: "Premium makhana supplier in Jaipur with transparent pricing.", url: "/jaipur-makhana-price-guide", phone: "+918949359415", address: "AA-7, Nursery Cir, Vaishali Nagar, Jaipur" }),
    faqSchema(faqData),
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><MapPin size={14} /> Jaipur Market Update</span>
            <h1>Makhana Price in Jaipur <span className={styles.heroHighlight}>2026 Guide</span></h1>
            <p className={styles.heroSubtitle}>Current wholesale and retail makhana prices in Jaipur. Updated July 2026. Suta-graded, FSSAI certified, direct from Bihar.</p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20what%20is%20today%27s%20makhana%20price%20in%20Jaipur%3F" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={18} /> Get Today's Price</a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}><Phone size={18} /> Call Now</a>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Current Rates</span>
            <h2 className={styles.sectionTitle}>Makhana Wholesale Price in Jaipur</h2>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}><span>Grade</span><span>Size</span><span>Price in Jaipur</span></div>
              {[{ grade: "4/4+ Suta (Commercial)", size: "12-14mm", price: "₹900/kg" }, { grade: "5+ Suta (Premium)", size: "15-19mm", price: "₹1,100/kg" }, { grade: "6+ Suta (Jumbo Export)", size: "19mm+", price: "₹1,400/kg" }].map(r => (
                <div key={r.grade} className={styles.priceRow}><span className={styles.priceCell}><strong>{r.grade}</strong></span><span className={styles.priceCell}>{r.size}</span><span className={styles.priceValue}>{r.price}</span></div>
              ))}
            </div>
            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={20} /> Retail packs starting from ₹300 (250g) — available at our Vaishali Nagar store</li>
              <li><CheckCircle2 size={20} /> Bulk discounts: 5% off for 50kg+, 10% off for 100kg+</li>
              <li><CheckCircle2 size={20} /> Free delivery within Jaipur for orders above ₹499</li>
            </ul>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Makhana Price FAQs — Jaipur</h2>
            <div className={styles.faqGrid}>
              {faqData.map(item => (
                <div key={item.q} className={styles.faqItem}><h4>{item.q}</h4><p>{item.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Visit Our Vaishali Nagar Store</h2>
          <p>AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur 302021</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={20} /> Price Enquiry</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
