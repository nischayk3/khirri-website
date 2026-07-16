import type { Metadata } from "next";
import {
  ShoppingBag,
  ShieldCheck,
  MessageCircle,
  Phone,
  CheckCircle2,
  Award,
  Factory,
  Package,
  Star,
  Leaf,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Makhana Cookies Wholesale | Bulk Cookies Manufacturer | Khirri",
  description:
    "Wholesale makhana cookies manufacturer — made with 60% makhana flour. Baked not fried, gluten-free, protein-rich. Bulk supply for cafes, retail chains, and corporate gifting. Call +91 89493 59415.",
  alternates: {
    canonical: "https://khirri.com/makhana-cookies-wholesale",
  },
  keywords: [
    "makhana cookies wholesale",
    "bulk makhana cookies manufacturer",
    "healthy cookies supplier india",
    "makhana cookies bulk order",
    "gluten free cookies wholesale",
    "makhana cookies for cafes",
    "corporate gifting makhana cookies",
  ],
  openGraph: {
    title: "Makhana Cookies Wholesale | Bulk Manufacturer | Khirri",
    description: "Premium makhana cookies made with 60% makhana flour. Available for bulk orders, private label, and corporate gifting. Baked, not fried.",
    images: [{ url: "/images/products/makhana-cookies-60percent-makhana-flour.webp", width: 800, height: 800, alt: "Khirri Makhana Cookies jar — wholesale bulk supply" }],
  },
};

const faqData = [
  {
    q: "What is the wholesale price of makhana cookies?",
    a: "Our wholesale makhana cookies pricing starts at ₹300 for 250g jars, ₹500 for 500g, and ₹1,000 for 1kg packs. Volume discounts available for 50+ units and 100+ units. Contact us for a custom quote.",
  },
  {
    q: "Are makhana cookies gluten-free?",
    a: "Yes! Our makhana cookies are made with 60% makhana flour and are completely gluten-free. They are baked (not fried), low in oil, and contain no artificial preservatives.",
  },
  {
    q: "Can I get private label makhana cookies for my brand?",
    a: "Absolutely. We offer private label makhana cookies with custom branding, packaging design, and labeling. MOQ for private label is 100 units. We handle the entire packaging process.",
  },
  {
    q: "What is the shelf life of makhana cookies?",
    a: "Our makhana cookies have a shelf life of 6 months when stored in a cool, dry place. We use nitrogen-flushed packaging for extended freshness. Each jar comes with a best-before date.",
  },
  {
    q: "Do you supply makhana cookies to cafes and hotels?",
    a: "Yes, we supply to cafes, hotels, bakeries, and retail chains across India. Our cookies are perfect for tea-time menus, healthy snack options, and dessert platters.",
  },
  {
    q: "What is the minimum order for bulk makhana cookies?",
    a: "Minimum wholesale order is 12 jars (mix-and-match across sizes welcome). For corporate gifting orders, minimum is 25 units with customized packaging options.",
  },
];

export default function MakhanaCookiesWholesalePage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Makhana Cookies Wholesale", url: "/makhana-cookies-wholesale" },
    ]),
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
              <ShoppingBag size={14} /> Wholesale Available
            </span>
            <h1>
              Makhana Cookies — <br />
              <span className={styles.heroHighlight}>Wholesale & Bulk Supply</span>
            </h1>
            <p className={styles.heroSubtitle}>
              India's healthiest cookie — made with 60% Makhana flour. Baked, not fried.
              Gluten-free, protein-rich, and available for bulk orders, private label,
              and corporate gifting.
            </p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20order%20makhana%20cookies%20in%20bulk." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <MessageCircle size={18} />
                Order Cookies in Bulk
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
            <span className={styles.sectionEyebrow}>Why Makhana Cookies</span>
            <h2 className={styles.sectionTitle}>The Healthiest Cookie on the Market</h2>
            <p className={styles.sectionText}>
              As consumers move away from refined flour cookies, makhana cookies are emerging
              as the top alternative. Here's why businesses across India are stocking them.
            </p>
            <div className={styles.grid}>
              {[
                { icon: Leaf, title: "60% Makhana Flour", desc: "Made with real Phool Makhana flour — not refined wheat. Naturally gluten-free and protein-rich." },
                { icon: Award, title: "Baked, Not Fried", desc: "Low oil content. Each cookie is baked to perfection for a wholesome crunch without the guilt." },
                { icon: Star, title: "12g Protein per 100g", desc: "Higher protein than regular cookies. Appeals to fitness-conscious, health-aware consumers." },
                { icon: Package, title: "Premium Jar Packaging", desc: "Attractive, shelf-ready jar packaging. Available in 250g, 500g, and 1kg sizes." },
                { icon: Factory, title: "Private Label Available", desc: "Launch your own cookie brand. We handle manufacturing, packaging, and labeling." },
                { icon: ShieldCheck, title: "FSSAI Certified", desc: "Lab-tested, no artificial preservatives, no additives. Clean-label ingredients." },
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
            <span className={styles.sectionEyebrow}>Wholesale Pricing</span>
            <h2 className={styles.sectionTitle}>Bulk Makhana Cookies Price</h2>
            <p className={styles.sectionText}>
              Tiered pricing for businesses. Mix-and-match across sizes welcome.
            </p>
            <div className={styles.priceTable}>
              <div className={`${styles.priceRow} ${styles.priceHeader}`}>
                <span>Pack Size</span>
                <span>Retail Price</span>
                <span>Wholesale Price (12+ units)</span>
              </div>
              {[
                { size: "250g Jar", retail: "₹349", wholesale: "₹300/unit" },
                { size: "500g Jar", retail: "₹599", wholesale: "₹500/unit" },
                { size: "1kg Jar", retail: "₹1,199", wholesale: "₹1,000/unit" },
              ].map((row) => (
                <div key={row.size} className={styles.priceRow}>
                  <span className={styles.priceCell}><strong>{row.size}</strong></span>
                  <span className={styles.priceCell}>{row.retail}</span>
                  <span className={styles.priceValue}>{row.wholesale}</span>
                </div>
              ))}
            </div>
            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={20} /> Volume discount: 10% off for 50+ units, 15% off for 100+ units</li>
              <li><CheckCircle2 size={20} /> Custom packaging and branding for bulk orders</li>
              <li><CheckCircle2 size={20} /> Free delivery within Jaipur for orders above ₹2,499</li>
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
          <h2>Stock the Healthiest Cookies in Your Store</h2>
          <p>Get wholesale pricing, samples, and delivery timeline — respond within 2 hours on WhatsApp.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20order%20makhana%20cookies%20for%20my%20business." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              <MessageCircle size={20} />
              Order Now on WhatsApp
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
              <p>Visit</p>
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
