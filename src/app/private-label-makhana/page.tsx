import type { Metadata } from "next";
import { MessageCircle, Package, ShieldCheck, PaintBucket, Tag, Truck, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Private Label Makhana | Launch Your Own Makhana Brand | Khirri",
  description: "Launch your own makhana brand with Khirri's private label service. Custom packaging, FSSAI certified, pan-India delivery. Starting at ₹5,999. Call +91 89493 59415.",
  alternates: { canonical: "https://khirri.com/private-label-makhana" },
  keywords: ["private label makhana", "white label makhana", "own makhana brand", "makhana contract manufacturing", "private label makhana cookies", "makhana packaging services"],
};

const faqData = [
  { q: "What is the minimum order for private label makhana?", a: "Our minimum order for private label is 100 units (mix-and-match across product types welcome). For contract manufacturing, minimum is 50kg per SKU." },
  { q: "What packaging options are available?", a: "We offer branded pouches (nitrogen-flushed), jars, boxes, and custom-printed bags. You can choose size, material, design, and labeling as per your brand requirements." },
  { q: "Do you provide FSSAI certification with private label?", a: "Yes. All products are manufactured in FSSAI-certified facilities. We provide batch-wise test reports and can assist with FSSAI licensing for your brand." },
  { q: "What products can I launch under private label?", a: "Raw makhana (suta-graded), makhana cookies, flavored makhana, dry fruits (anjeer, walnut), mixed millets, and custom blends. You choose the product mix." },
  { q: "How long does it take to launch?", a: "Typical turnaround is 7-10 business days from design approval to dispatch. First batch usually ships within 2 weeks." },
];

export default function PrivateLabelPage() {
  const schemas = [
    breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Private Label Makhana", url: "/private-label-makhana" }]),
    faqSchema(faqData),
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><PaintBucket size={14} /> Private Label Solutions</span>
            <h1>Launch Your Own <span className={styles.heroHighlight}>Makhana Brand</span></h1>
            <p className={styles.heroSubtitle}>Complete private label solution — from product sourcing to branded packaging. Start your makhana brand with Khirri at just ₹5,999. FSSAI certified, pan-India delivery.</p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20launch%20my%20own%20makhana%20brand%20with%20private%20label%20packaging." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={18} /> Start Your Brand</a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>Call +91 89493 59415</a>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>How It Works</span>
            <h2 className={styles.sectionTitle}>Private Label Process</h2>
            <div className={styles.grid}>
              {[
                { icon: MessageCircle, title: "1. Tell Us Your Vision", desc: "Share your brand name, design preferences, product choices, and target market." },
                { icon: Package, title: "2. Choose Your Products", desc: "Select from raw makhana, makhana cookies, dry fruits, or custom blends. Mix and match." },
                { icon: PaintBucket, title: "3. Custom Packaging", desc: "We handle pouch/jar design, printing, labeling, and branding as per your specifications." },
                { icon: ShieldCheck, title: "4. FSSAI Certified Production", desc: "Manufactured in our certified facility. Lab-tested, quality-approved, batch-tracked." },
                { icon: Tag, title: "5. Your Brand, Ready to Sell", desc: "Receive ready-to-sell branded products. Dispatch to your customers or your store." },
                { icon: Truck, title: "6. Pan-India Scale-Up", desc: "As you grow, we scale production. Consistent quality across every batch, every time." },
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

        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Investment</span>
            <h2 className={styles.sectionTitle}>Private Label Pricing</h2>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}><span>Package</span><span>Inclusions</span><span>Investment</span></div>
              {[
                { pkg: "Starter", incl: "Custom pouches + labeling for 1 product, 100 units", price: "₹5,999" },
                { pkg: "Growth", incl: "Custom jars + labeling, 2-3 products, 250 units", price: "₹12,999" },
                { pkg: "Premium", incl: "Full branding, 3+ products, custom design, 500 units", price: "Custom Quote" },
              ].map(r => (
                <div key={r.pkg} className={styles.priceRow}>
                  <span className={styles.priceCell}><strong>{r.pkg}</strong></span>
                  <span className={styles.priceCell}>{r.incl}</span>
                  <span className={styles.priceValue}>{r.price}</span>
                </div>
              ))}
            </div>
            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={20} /> All-inclusive pricing: GST, packaging, labeling, and filling included</li>
              <li><CheckCircle2 size={20} /> FSSAI certification and lab test reports with every batch</li>
              <li><CheckCircle2 size={20} /> Pan-India shipping via ShipRocket with tracking</li>
            </ul>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>FAQ</span>
            <h2 className={styles.sectionTitle}>Private Label FAQs</h2>
            <div className={styles.faqGrid}>
              {faqData.map(item => (
                <div key={item.q} className={styles.faqItem}><h4>{item.q}</h4><p>{item.a}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Launch Your Makhana Brand?</h2>
          <p>Get a custom quote within 2 hours. Share your requirements — we handle the rest.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20discuss%20private%20label%20makhana%20packaging%20for%20my%20brand." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={20} /> Get Private Label Quote</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
