import type { Metadata } from "next";
import Image from "next/image";
import { ShoppingCart, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./flavored.module.css";

export const metadata: Metadata = {
  title: "Flavored Makhana Online — Buy Roasted & Spiced Fox Nuts | Khirri",
  description: "Discover Khirri's flavored makhana collection — peri peri, cream & onion, pudina, salt & pepper, tangy tomato, and more. Healthy, roasted, and delivered across India.",
  alternates: { canonical: "https://khirri.com/flavored-makhana" },
  openGraph: {
    title: "Flavored Makhana — Healthy Roasted Snacks | Khirri",
    description: "Premium flavored makhana (roasted fox nuts) in 8+ bold flavors. Guilt-free snacking delivered to your doorstep.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Flavored Makhana by Khirri" }],
  },
};

const flavors = [
  { name: "Peri Peri Makhana", emoji: "🌶️", desc: "Bold, spicy, and addictive. Made with authentic peri peri seasoning for a fiery kick.", price: "₹349", pack: "250g" },
  { name: "Cream & Onion Makhana", emoji: "🧅", desc: "Creamy, tangy, and absolutely irresistible. A crowd-pleaser for every occasion.", price: "₹349", pack: "250g" },
  { name: "Pudina (Mint) Makhana", emoji: "🌿", desc: "Refreshing mint flavor that cools as it crunches. Perfect for summer snacking.", price: "₹349", pack: "250g" },
  { name: "Salt & Pepper Makhana", emoji: "🧂", desc: "Classic, simple, and delicious. Lightly seasoned with Himalayan salt and black pepper.", price: "₹299", pack: "250g" },
  { name: "Tangy Tomato Makhana", emoji: "🍅", desc: "Sweet, tangy, and packed with tomato goodness. A flavor the whole family will love.", price: "₹349", pack: "250g" },
  { name: "Chilli Garlic Makhana", emoji: "🧄", desc: "For those who love it hot and bold. Roasted with garlic oil and red chilies.", price: "₹349", pack: "250g" },
  { name: "Cheese Chilli Makhana", emoji: "🧀", desc: "Zesty cheese meets spicy chilli. A flavor explosion in every bite.", price: "₹349", pack: "250g" },
  { name: "Magic Masala Makhana", emoji: "✨", desc: "Our signature masala blend — the perfect balance of tangy, spicy, and savory.", price: "₹349", pack: "250g" },
];

const benefits = [
  "100% roasted, not fried",
  "Gluten-free & vegan-friendly",
  "No artificial preservatives",
  "High protein, low calorie",
  "Made with premium Khirri makhana",
  "FSSAI certified",
];

const faqData = [
  { q: "Are Khirri flavored makhana healthy?", a: "Yes! Our flavored makhana is roasted (not fried), gluten-free, and contains no artificial preservatives. A 30g serving is approximately 110-130 calories depending on flavor." },
  { q: "What is the shelf life of flavored makhana?", a: "Our flavored makhana has a shelf life of 4-6 months when stored in a cool, dry place. Once opened, consume within 2-3 weeks for best crunch." },
  { q: "Do you offer combo packs?", a: "Yes, we offer curated combos — try our Best Seller Combo (Peri Peri + Cream & Onion + Salt & Pepper) or our Party Pack (all 8 flavors)." },
  { q: "Can I order flavored makhana in bulk?", a: "Yes, we offer bulk wholesale pricing on flavored makhana for cafes, retailers, and events. Contact us on WhatsApp for quotes." },
  { q: "Is flavored makhana suitable for kids?", a: "Absolutely! Our Salt & Pepper and Cream & Onion flavors are mild and kid-friendly. We recommend them as a healthy lunchbox snack." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FlavoredMakhanaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Sparkles size={14} /> New Arrivals</span>
            <h1 className={styles.heroTitle}>Flavored Makhana<br /><span className={styles.heroHighlight}>Roasted to Perfection</span></h1>
            <p className={styles.heroSubtitle}>Browse our collection of bold, delicious flavored makhana — made with premium fox nuts and seasoned with the finest spices. 100% roasted, never fried.</p>
            <div className={styles.heroCta}>
              <a href="#flavors" className={styles.primaryBtn}>Browse Flavors</a>
              <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>Bulk Enquiry</a>
            </div>
          </div>
          <div className={styles.badgesRow}>
            <span className={styles.badge}>🔥 8 Bold Flavors</span>
            <span className={styles.badge}>🌱 Gluten Free</span>
            <span className={styles.badge}>💰 Free Shipping above ₹499</span>
          </div>
        </section>

        <section className={styles.section} id="flavors">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Choose Your Flavor</h2>
            <p className={styles.sectionSub}>Every batch made with premium Khirri Phool Makhana, hand-seasoned, and roasted to crunchy perfection.</p>
            <div className={styles.grid}>
              {flavors.map((flavor) => (
                <div key={flavor.name} className={styles.flavorCard}>
                  <span className={styles.flavorEmoji}>{flavor.emoji}</span>
                  <h3 className={styles.flavorName}>{flavor.name}</h3>
                  <p className={styles.flavorDesc}>{flavor.desc}</p>
                  <div className={styles.flavorMeta}>
                    <span className={styles.flavorPrice}>{flavor.price}</span>
                    <span className={styles.flavorPack}>/ {flavor.pack}</span>
                  </div>
                  <div className={styles.flavorCta}>
                    <button className={styles.addBtn} disabled>
                      <ShoppingCart size={15} />
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.note}>
              <p>All flavors currently available for <strong>bulk/wholesale orders only</strong>. Retail packs launching soon. <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer">Pre-order on WhatsApp →</a></p>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose Khirri Flavored Makhana?</h2>
            <div className={styles.benefitsGrid}>
              {benefits.map((b) => (
                <div key={b} className={styles.benefitItem}>
                  <CheckCircle2 size={18} className={styles.benefitIcon} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>FAQ — Flavored Makhana</h2>
            <div className={styles.faqGrid}>
              {faqData.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{item.q} <span className={styles.faqToggle}>+</span></summary>
                  <div className={styles.faqA}><p>{item.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Want to Stock Our Flavors?</h2>
            <p>Bulk orders, private labeling, and cafe supply available. Get in touch for wholesale pricing.</p>
            <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
