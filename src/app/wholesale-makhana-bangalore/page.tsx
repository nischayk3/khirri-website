import type { Metadata } from "next";
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  Phone,
  CheckCircle2,
  Award,
  Warehouse,
  MapPin,
  Clock,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema, localBusinessSchema, faqSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Wholesale Makhana Supplier in Bangalore | Bulk Fox Nuts | Khirri",
  description:
    "Premium wholesale makhana supply in Bangalore. Direct Bihar sourcing — 4, 5, 6+ Suta grades. Reliable pan-India logistics from Jaipur to Bangalore. FSSAI certified. Call +91 89493 59415.",
  alternates: {
    canonical: "https://khirri.com/wholesale-makhana-bangalore",
  },
  keywords: [
    "wholesale makhana bangalore",
    "bulk makhana supplier bangalore",
    "makhana price bangalore",
    "fox nuts wholesale bangalore",
    "raw makhana supplier karnataka",
    "phool makhana bangalore b2b",
    "makhana distributors bangalore",
  ],
  openGraph: {
    title: "Wholesale Makhana Supplier in Bangalore | Bulk Supply",
    description: "Premium raw makhana delivered to Bangalore from Bihar via Jaipur. Hand-graded, lab-tested, FSSAI certified. MOQ 8kg.",
    images: [{ url: "/images/products/bulk-makhana-wholesale-supply-khirri.webp", width: 800, height: 800, alt: "Bulk makhana supply to Bangalore from Khirri" }],
  },
};

const faqData = [
  {
    q: "What is the wholesale makhana price in Bangalore?",
    a: "Khirri offers competitive wholesale makhana prices delivered to Bangalore starting from ₹900/kg for 4 Suta, ₹1,100/kg for 5+ Suta, and ₹1,400/kg for 6+ Jumbo grade. Prices include GST and are FOB Jaipur. Contact us for current Bangalore delivery pricing.",
  },
  {
    q: "How do you ship makhana from Jaipur to Bangalore?",
    a: "We use moisture-protected, vacuum-sealed packaging and ship via trusted pan-India freight partners. Typical delivery to Bangalore takes 5-7 business days. Bulk orders (50kg+) qualify for priority shipping.",
  },
  {
    q: "Can you supply makhana for dark stores in Bangalore?",
    a: "Yes! We partner with quick-commerce dark stores across Bangalore. Our consistent supply chain ensures your 10-minute delivery apps never show 'Out of Stock' for premium Khirri makhana.",
  },
  {
    q: "What is the minimum order for Bangalore delivery?",
    a: "Minimum order is 8kg (one sack). For larger volumes, we offer tiered pricing — 25kg, 50kg, and 100kg+ with significant discounts.",
  },
  {
    q: "Do you provide quality certification with bulk orders?",
    a: "Absolutely. Every bulk order includes FSSAI certification, lab test reports, and batch traceability documents. We maintain strict quality control across all suta grades.",
  },
  {
    q: "How is Khirri different from local Bangalore makhana suppliers?",
    a: "Unlike Bangalore-based distributors who source through multiple middlemen, Khirri ships directly from Bihar via our Jaipur hub. This means fresher stock, better grading consistency, and more competitive pricing.",
  },
];

export default function WholesaleMakhanaBangalorePage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Wholesale Makhana Bangalore", url: "/wholesale-makhana-bangalore" },
    ]),
    localBusinessSchema({
      city: "Bangalore",
      state: "Karnataka",
      description: "Premium wholesale makhana supplier delivering to Bangalore. Direct Bihar sourcing, hand-graded suta sizes.",
      url: "/wholesale-makhana-bangalore",
      phone: "+918949359415",
    }),
    faqSchema(faqData),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Navbar />
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              <Truck size={14} /> Pan-India Delivery
            </span>
            <h1>
              #1 Wholesale Makhana Supplier <br />
              <span className={styles.heroHighlight}>in Bangalore</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Farm-fresh Phool Makhana shipped directly from Bihar to your business in Bangalore.
              No middlemen, no mixed grades — just premium quality at wholesale prices.
            </p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20need%20wholesale%20makhana%20delivered%20to%20Bangalore." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <MessageCircle size={18} />
                Get Bangalore Pricing
              </a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>
                <Phone size={18} />
                Call +91 89493 59415
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Why Bangalore Chooses Khirri</span>
            <h2 className={styles.sectionTitle}>Premium Makhana, Delivered to Your Doorstep</h2>
            <p className={styles.sectionText}>
              Bangalore's thriving health-food market demands consistent, high-quality makhana supply.
              Khirri bridges the gap between Bihar's farms and Karnataka's businesses.
            </p>
            <div className={styles.grid}>
              {[
                { icon: Truck, title: "Direct Jaipur-Bangalore Route", desc: "Optimized logistics chain from our Jaipur hub to Bangalore. 5-7 day delivery." },
                { icon: ShieldCheck, title: "FSSAI Certified Quality", desc: "Lab-tested, moisture-controlled, and batch-certified for food safety compliance." },
                { icon: Award, title: "Transparent Suta Grading", desc: "4 Suta, 5+ Suta, 6+ Jumbo — you get exactly what you pay for. No mixed batches." },
                { icon: Warehouse, title: "Bulk Volume Capability", desc: "From 8kg sacks to 500kg+ orders. We scale with your business needs." },
                { icon: Clock, title: "Consistent Supply", desc: "Year-round availability regardless of season. No stock-outs for our B2B partners." },
                { icon: MapPin, title: "Dark Store Ready", desc: "Specialized packaging and labeling for quick-commerce dark stores in Bangalore." },
              ].map((item) => (
                <div key={item.title} className={styles.card}>
                  <div className={styles.cardIcon}><item.icon size={24} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Transparent Pricing</span>
            <h2 className={styles.sectionTitle}>Bulk Makhana Price — Delivered to Bangalore</h2>
            <p className={styles.sectionText}>
              FOB Jaipur pricing. Shipping to Bangalore calculated based on order volume.
            </p>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}>
                <span>Grade</span>
                <span>Size</span>
                <span>Bulk Price (per kg)</span>
              </div>
              {[
                { grade: "4/4+ Suta (Commercial)", size: "12-14mm", price: "₹900/kg" },
                { grade: "5+ Suta (Premium)", size: "15-19mm", price: "₹1,100/kg" },
                { grade: "6+ Suta (Jumbo Export)", size: "19mm+", price: "₹1,400/kg" },
              ].map((row) => (
                <div key={row.grade} className={styles.priceRow}>
                  <span className={styles.priceCell}><strong>{row.grade}</strong></span>
                  <span className={styles.priceCell}>{row.size}</span>
                  <span className={styles.priceValue}>{row.price}</span>
                </div>
              ))}
            </div>
            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={20} /> Volume discounts: 5% off for 50kg+, 10% off for 100kg+</li>
              <li><CheckCircle2 size={20} /> GST invoice with e-way bill for all B2B orders</li>
              <li><CheckCircle2 size={20} /> Sample batch available before first bulk order</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {faqData.map((item) => (
                <div key={item.q} className={styles.faqItem}>
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2>Ready for Reliable Makhana Supply in Bangalore?</h2>
          <p>Get a custom quote including shipping to your Bangalore address within 2 hours.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20need%20makhana%20delivered%20to%20Bangalore%20-%20please%20share%20pricing." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              <MessageCircle size={20} />
              Get Quote on WhatsApp
            </a>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <p>Call us</p>
              <a href="tel:+918949359415">+91 89493 59415</a>
            </div>
            <div className={styles.contactItem}>
              <p>Email</p>
              <a href="mailto:hello@khirri.com">hello@khirri.com</a>
            </div>
            <div className={styles.contactItem}>
              <p>HQ</p>
              <a href="https://maps.google.com/?q=Vaishali+Nagar,+Jaipur,+Rajasthan" target="_blank">Vaishali Nagar, Jaipur</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
