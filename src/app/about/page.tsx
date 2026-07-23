import type { Metadata } from "next";
import { Award, ShieldCheck, Warehouse, MapPin, Users, Heart, Sprout, Globe } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Khirri | Premium Makhana Supplier — Jaipur",
  description: "Discover the Khirri story. From Bihar's makhana heartland to your doorstep. FSSAI certified, direct farm sourcing, hand-graded quality since 2024. Based in Vaishali Nagar, Jaipur.",
  alternates: { canonical: "https://khirri.com/about" },
  keywords: [
    "about khirri makhana",
    "khirri trading company jaipur",
    "makhana supplier story",
    "bihar makhana brand jaipur",
  ],
  openGraph: {
    title: "About Khirri | Our Story & Values",
    description: "From Bihar farms to your business — the Khirri story of quality, tradition, and trust.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About Khirri Phool Makhana" }],
  },
};

const timeline = [
  { year: "2024", title: "The Beginning", desc: "Khirri Trading Company founded in Vaishali Nagar, Jaipur with a mission to bring authentic Bihar-sourced makhana to businesses and consumers across India." },
  { year: "2025", title: "Direct Farm Partnerships", desc: "Established direct sourcing partnerships with farmers in Darbhanga and Mithila, eliminating middlemen and ensuring premium quality." },
  { year: "2025", title: "Product Expansion", desc: "Launched Makhana Cookies (60% makhana flour), Afghan Anjeer, Kashmiri Walnuts, and Mixed Millet range. Expanded from B2B to retail." },
  { year: "2026", title: "Pan-India Reach", desc: "Now supplying bulk makhana pan-India to businesses, dark stores, namkeen shops, and health food brands. 48-page website with online ordering." },
  { year: "2026+", title: "Export & Growth", desc: "Planning international expansion to serve the growing global demand for Indian makhana." },
];

const teamValues = [
  { icon: Sprout, title: "Farm-First Sourcing", desc: "We source directly from Bihar's makhana heartland — no middlemen, no mixing grades, no compromises." },
  { icon: ShieldCheck, title: "FSSAI Certified Quality", desc: "Every batch is lab-tested, hand-graded, and certified. We provide quality reports with every bulk order." },
  { icon: Heart, title: "Health First", desc: "100% natural, no preservatives, no additives. Makhana is gluten-free, high-protein, and low-glycemic." },
  { icon: Globe, title: "Pan-India Supply", desc: "From Jaipur to any city in India — reliable logistics, moisture-protected packaging, consistent quality." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Warehouse size={14} /> Our Story</span>
            <h1 className={styles.heroTitle}>
              From Bihar's Farms<br />
              <span className={styles.heroHighlight}>To Your Doorstep</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Khirri was born from a simple belief — that the finest Phool Makhana should reach
              every home and business in India without the markup of middlemen, without compromising
              on quality, and without losing its connection to the farmers who grow it.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.missionGrid}>
              <div className={styles.missionText}>
                <h2>Our Mission</h2>
                <p>
                  To be India&apos;s most trusted bridge between Bihar&apos;s makhana farmers and the world —
                  ensuring fair prices for growers, premium quality for buyers, and a product that
                  celebrates the rich agricultural heritage of the Mithila region.
                </p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>85%+</span>
                    <span className={styles.statLabel}>of world&apos;s makhana from Bihar</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>3+</span>
                    <span className={styles.statLabel}>suta grades stocked</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNum}>20+</span>
                    <span className={styles.statLabel}>cities served pan-India</span>
                  </div>
                </div>
              </div>
              <div className={styles.missionCard}>
                <Award size={40} />
                <h3>FSSAI Certified</h3>
                <p>Lab-tested, 100% natural, no preservatives. Quality is our foundation.</p>
                <hr className={styles.divider} />
                <MapPin size={20} />
                <p className={styles.address}>AA-7, Nursery Cir, Vaishali Nagar, Jaipur 302021</p>
                <p className={styles.hours}>Open daily: 10:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <div className={styles.timeline}>
              {timeline.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineContent}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What Drives Us</h2>
            <p className={styles.sectionText}>Four principles that guide everything we do at Khirri.</p>
            <div className={styles.valuesGrid}>
              {teamValues.map((v) => (
                <div key={v.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}><v.icon size={28} /></div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Want to Source the Best Makhana?</h2>
            <p>Whether you&apos;re a business looking for bulk supply or a customer who loves quality, we&apos;d love to hear from you.</p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <Users size={18} />
                Chat with Us
              </a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>
                Call +91 89493 59415
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
