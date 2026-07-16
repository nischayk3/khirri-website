import type { Metadata } from "next";
import { MessageCircle, Ruler, CheckCircle2, ShoppingBag } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Makhana Suta Size Guide | Makhana Grading Chart 4, 5, 6+ Suta | Khirri",
  description: "Complete makhana suta size guide. Learn the difference between 4 Suta, 5+ Suta, and 6+ Jumbo grade makhana. Size chart, recommended uses, and pricing for each grade.",
  alternates: { canonical: "https://khirri.com/makhana-size-guide" },
};

const faqData = [
  { q: "What does 'Suta' mean in makhana grading?", a: "Suta is a traditional measurement unit for makhana size. 1 Suta = approximately 3.3mm. Higher suta means larger, whiter, and more premium makhana pops." },
  { q: "Which suta grade is best for flavored makhana?", a: "5+ Suta is the ideal grade for flavored makhana. It's large enough for premium presentation but cost-effective enough for commercial production." },
  { q: "What is 6+ Suta makhana used for?", a: "6+ Suta (Jumbo/Export grade) is the largest and whitest grade. Perfect for premium retail packaging, gifting, and export markets." },
  { q: "Is 4 Suta makhana good quality?", a: "Yes! 4 Suta is excellent commercial grade makhana (12-14mm). It's ideal for namkeen shops, mass-market flavored makhana, and budget-conscious buyers." },
];

export default function MakhanaSizeGuidePage() {
  const schemas = [
    breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Makhana Size Guide", url: "/makhana-size-guide" }]),
    faqSchema(faqData),
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Ruler size={14} /> Suta Grading Guide</span>
            <h1>Makhana Suta Size <span className={styles.heroHighlight}>Guide & Chart</span></h1>
            <p className={styles.heroSubtitle}>Understand makhana grading like an expert. Compare 4 Suta, 5+ Suta, and 6+ Jumbo grades — size, quality, best use, and pricing.</p>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Grade Comparison</span>
            <h2 className={styles.sectionTitle}>Makhana Grade Comparison Chart</h2>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}>
                <span>Grade</span>
                <span>Size (mm)</span>
                <span>Appearance</span>
                <span>Best For</span>
                <span>Price/kg</span>
              </div>
              {[
                { grade: "4/4+ Suta", size: "12-14mm", appearance: "Standard white, mixed sizes", bestFor: "Namkeen shops, mass-market flavored", price: "₹900" },
                { grade: "5+ Suta", size: "15-19mm", appearance: "Large, uniform, bright white", bestFor: "Premium retail, flavored makhana", price: "₹1,100" },
                { grade: "6+ Jumbo", size: "19mm+", appearance: "Jumbo, hand-picked, whitest", bestFor: "Export, gifting, luxury retail", price: "₹1,400" },
              ].map(r => (
                <div key={r.grade} className={styles.priceRow}>
                  <span className={styles.priceCell}><strong>{r.grade}</strong></span>
                  <span className={styles.priceCell}>{r.size}</span>
                  <span className={styles.priceCell}>{r.appearance}</span>
                  <span className={styles.priceCell}>{r.bestFor}</span>
                  <span className={styles.priceValue}>{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Which Grade to Choose</span>
            <h2 className={styles.sectionTitle}>Selecting the Right Makhana Grade</h2>
            <div className={styles.grid}>
              {[
                { title: "4 Suta — Best for Value", desc: "Ideal for namkeen shops, budget-friendly retail, and bulk commercial use. Good quality at the most affordable price.", action: "Shop 4 Suta", slug: "/product/raw-phool-makhana" },
                { title: "5+ Suta — Best for Retail", desc: "The sweet spot. Large, uniform pops perfect for flavored makhana, premium retail packs, and café menus. Most popular grade.", action: "Shop 5+ Suta", slug: "/product/raw-phool-makhana" },
                { title: "6+ Jumbo — Best for Premium", desc: "The finest grade. Hand-picked jumbo pops, snow-white appearance. Perfect for export, luxury gifting, and premium brand positioning.", action: "Shop 6+ Suta", slug: "/product/raw-phool-makhana" },
              ].map(item => (
                <div key={item.title} className={styles.card}>
                  <h3>{item.title}</h3>
                  <p style={{ marginBottom: "1.5rem" }}>{item.desc}</p>
                  <Link href={item.slug} className={styles.ctaPrimary} style={{ display: "inline-flex", padding: "10px 20px", fontSize: "0.9rem" }}>
                    <ShoppingBag size={16} /> {item.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Makhana Grading FAQs</h2>
            <div className={styles.faqGrid}>
              {faqData.map(item => (
                <div key={item.q} className={styles.faqItem}><h4>{item.q}</h4><p>{item.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Need Help Choosing the Right Grade?</h2>
          <p>Tell us what you need — we'll recommend the perfect grade for your business.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={20} /> Get Expert Advice</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
