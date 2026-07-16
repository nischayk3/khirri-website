import type { Metadata } from "next";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  Star,
  Phone,
  MessageCircle,
  CheckCircle2,
  Award,
  Warehouse,
  MapPin,
  Package,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema, localBusinessSchema, faqSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Bulk Makhana Supplier in Jaipur | Wholesale Raw Makhana | Khirri",
  description:
    "Looking for bulk makhana supply in Jaipur? Khirri is a trusted wholesale raw makhana supplier offering suta-graded fox nuts at competitive prices. Pan-India delivery. Call +91 89493 59415.",
  alternates: {
    canonical: "https://khirri.com/bulk-makhana-supplier-jaipur",
  },
  keywords: [
    "bulk makhana supplier jaipur",
    "wholesale makhana jaipur",
    "raw makhana supplier rajasthan",
    "makhana bulk price jaipur",
    "fox nuts wholesale jaipur",
    "phool makhana b2b jaipur",
    "makhana manufacturers jaipur",
  ],
  openGraph: {
    title: "Bulk Makhana Supplier in Jaipur | Wholesale Rates",
    description:
      "Premium suta-graded raw makhana for businesses. Direct Bihar sourcing. 4, 5, 6+ Suta grades available in bulk. Pan-India delivery from Jaipur.",
    images: [{ url: "/images/products/bulk-makhana-wholesale-supply-khirri.webp", width: 800, height: 800, alt: "Bulk makhana supply from Khirri Jaipur" }],
  },
};

const faqData = [
  {
    q: "What is the wholesale price of Makhana in Jaipur?",
    a: "Khirri offers competitive wholesale makhana prices in Jaipur starting from ₹900/kg for 4 Suta grade, ₹1,100/kg for 5+ Suta, and ₹1,400/kg for 6+ Jumbo export grade. Prices vary based on order volume and season. Contact us for today's live bulk pricing.",
  },
  {
    q: "Do you deliver bulk makhana outside Jaipur?",
    a: "Yes! We deliver bulk makhana pan-India including Bangalore, Mumbai, Delhi, Hyderabad, and all major cities. Our logistics network ensures 5-7 day delivery with moisture-protected packaging.",
  },
  {
    q: "What is the minimum order quantity for bulk makhana?",
    a: "Our minimum order quantity for bulk makhana is 8kg (one sack). For larger volumes, we offer discounted pricing on 25kg, 50kg, and 100kg+ orders.",
  },
  {
    q: "What suta grades of makhana do you supply?",
    a: "We supply 4 Suta (commercial grade, 12-14mm), 5+ Suta (premium grade, 15-19mm), and 6+ Suta (jumbo export grade, 19mm+). Each grade is hand-graded and consistency-checked.",
  },
  {
    q: "Is your makhana FSSAI certified?",
    a: "Yes, Khirri makhana is fully FSSAI certified and lab-tested. We provide quality certificates with every bulk order. Our processing follows strict hygiene standards.",
  },
  {
    q: "Do you offer private label makhana packaging?",
    a: "Yes, we offer private label and custom packaging services for businesses wanting to launch their own makhana brand. We handle grading, packaging, and labeling as per your requirements.",
  },
];

export default function BulkMakhanaJaipurPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Bulk Makhana Supplier Jaipur", url: "/bulk-makhana-supplier-jaipur" },
    ]),
    localBusinessSchema({
      city: "Jaipur",
      state: "Rajasthan",
      description: "Premium bulk makhana supplier in Jaipur. Direct Bihar sourcing, hand-graded suta sizes, pan-India delivery.",
      url: "/bulk-makhana-supplier-jaipur",
      phone: "+918949359415",
      address: "AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
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
              <Warehouse size={14} /> B2B Bulk Supply
            </span>
            <h1>
              Best Bulk Makhana Supplier <br />
              <span className={styles.heroHighlight}>in Jaipur</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Premium suta-graded raw Phool Makhana sourced directly from Bihar farms.
              Trusted by namkeen shops, retailers, and brands across Jaipur and India.
            </p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20bulk%20Makhana%20supply%20in%20Jaipur." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <MessageCircle size={18} />
                Get Bulk Quote on WhatsApp
              </a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>
                <Phone size={18} />
                Call +91 89493 59415
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Khirri */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Why Khirri</span>
            <h2 className={styles.sectionTitle}>Jaipur's Trusted Makhana Wholesaler</h2>
            <p className={styles.sectionText}>
              Unlike other suppliers who mix grades or add middlemen margins, Khirri delivers
              farm-fresh, hand-graded makhana directly from Bihar to your business in Jaipur.
            </p>
            <div className={styles.grid}>
              {[
                { icon: Award, title: "Direct Bihar Sourcing", desc: "No middlemen. We source straight from farmers in Darbhanga and Mithila region." },
                { icon: ShieldCheck, title: "Hand-Graded Quality", desc: "Every batch graded by Suta size — 4, 5+, and 6+ Jumbo. No mixed grades, no broken pieces." },
                { icon: Truck, title: "Pan-India Delivery", desc: "Reliable logistics from Jaipur to any city. Moisture-protected packaging for freshness." },
                { icon: Star, title: "FSSAI Certified", desc: "Lab-tested, FSSAI-certified, and 100% natural. Quality reports with every bulk order." },
                { icon: Package, title: "Flexible MOQ", desc: "Start with 8kg sacks or scale to 500kg+. Volume discounts available." },
                { icon: MapPin, title: "Jaipur-Based", desc: "Visit our Vaishali Nagar facility. See the quality yourself before placing bulk orders." },
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

        {/* Pricing Table */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Transparent Pricing</span>
            <h2 className={styles.sectionTitle}>Bulk Makhana Price in Jaipur</h2>
            <p className={styles.sectionText}>
              No hidden charges. GST invoice included. Prices are per kg for bulk orders.
            </p>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}>
                <span>Grade</span>
                <span>Size</span>
                <span>Bulk Price (per kg)</span>
              </div>
              {[
                { grade: "4/4+ Suta", size: "12-14mm", price: "₹900/kg (MOQ 8kg)" },
                { grade: "5+ Suta", size: "15-19mm", price: "₹1,100/kg (MOQ 8kg)" },
                { grade: "6+ Jumbo", size: "19mm+", price: "₹1,400/kg (MOQ 8kg)" },
              ].map((row) => (
                <div key={row.grade} className={styles.priceRow}>
                  <span className={styles.priceCell}><strong>{row.grade}</strong></span>
                  <span className={styles.priceCell}>{row.size}</span>
                  <span className={styles.priceValue}>{row.price}</span>
                </div>
              ))}
            </div>
            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={20} /> Bulk discounts available for 50kg+ and 100kg+ orders</li>
              <li><CheckCircle2 size={20} /> Free delivery on orders above ₹2,499 within Jaipur</li>
              <li><CheckCircle2 size={20} /> GST invoice with every order for business buyers</li>
              <li><CheckCircle2 size={20} /> Sample batch available for quality verification</li>
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
          <h2>Ready to Place Your Bulk Order?</h2>
          <p>Get live pricing, availability, and delivery timeline within 2 hours on WhatsApp.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20need%20bulk%20makhana%20in%20Jaipur." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              <MessageCircle size={20} />
              Enquire on WhatsApp
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
              <p>Visit us</p>
              <a href="https://maps.google.com/?q=Vaishali+Nagar,+Jaipur,+Rajasthan" target="_blank" rel="noopener noreferrer">Vaishali Nagar, Jaipur</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
