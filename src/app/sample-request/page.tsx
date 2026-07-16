import type { Metadata } from "next";
import { MessageCircle, Phone, CheckCircle2, Package, Truck, ShieldCheck } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Request Makhana Sample | B2B Quality Check | Khirri",
  description: "Request a free sample batch of Khirri's premium raw makhana before placing bulk orders. Available for businesses, retailers, and brands across India.",
  alternates: { canonical: "https://khirri.com/sample-request" },
};

export default function SampleRequestPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Package size={14} /> B2B Sample Program</span>
            <h1>Request a <span className={styles.heroHighlight}>Free Makhana Sample</span></h1>
            <p className={styles.heroSubtitle}>
              Verify the quality yourself before placing bulk orders. We send sample batches of our suta-graded raw makhana, makhana cookies, and dry fruits to serious buyers across India.
            </p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20request%20a%20sample%20batch%20for%20quality%20check." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
                <MessageCircle size={18} />
                Request Sample on WhatsApp
              </a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>
                <Phone size={18} />
                Call +91 89493 59415
              </a>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>How It Works</span>
            <h2 className={styles.sectionTitle}>Sample Request Process</h2>
            <div className={styles.grid}>
              {[
                { icon: MessageCircle, title: "1. WhatsApp Us", desc: "Send us a message with your business details and the products you're interested in." },
                { icon: CheckCircle2, title: "2. We Confirm", desc: "We'll confirm sample availability and share a tracking number within 2 hours." },
                { icon: Truck, title: "3. Sample Delivered", desc: "Sample reaches you in 3-5 days via ShipRocket. No payment needed for first-time B2B buyers." },
                { icon: ShieldCheck, title: "4. Quality Check", desc: "Inspect the grading, freshness, and size. Place your bulk order once satisfied." },
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

        <section className={styles.ctaSection}>
          <h2>Ready to Try Before You Buy?</h2>
          <p>Send us a WhatsApp message with your name, business, city, and which products interest you. We'll respond within 2 hours.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20run%20a%20%5Bbusiness%20type%5D%20in%20%5Bcity%5D%20and%20want%20to%20request%20a%20sample%20of%20%5Bproducts%5D." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              <MessageCircle size={20} />
              Request Free Sample
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
