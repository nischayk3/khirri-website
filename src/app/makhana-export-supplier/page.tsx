import type { Metadata } from "next";
import { MessageCircle, Globe, ShieldCheck, Package, Ship, FileCheck } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "@/app/wholesale-shared.module.css";

export const metadata: Metadata = {
  title: "Makhana Exporter from India | Bulk Fox Nuts Export | Khirri",
  description: "Premium makhana exporter from India. Suta-graded, FSSAI certified, export-quality packaging. Serving buyers across India, USA, Canada, UAE, and Europe.",
  alternates: { canonical: "https://khirri.com/makhana-export-supplier" },
};

export default function ExportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Makhana Export", url: "/makhana-export-supplier" }])) }} />
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Globe size={14} /> India's Trusted Exporter</span>
            <h1>Premium Makhana <span className={styles.heroHighlight}>Export from India</span></h1>
            <p className={styles.heroSubtitle}>Export-grade suta-graded Phool Makhana — FSSAI certified, lab-tested, and export-ready packaging. Supplying to buyers in USA, Canada, UAE, Europe, and Asia.</p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20want%20to%20enquire%20about%20makhana%20export%20from%20India." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={18} /> Export Enquiry</a>
              <a href="tel:+918949359415" className={styles.ctaSecondary}>Call +91 89493 59415</a>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <span className={styles.sectionEyebrow}>Export Capability</span>
            <h2 className={styles.sectionTitle}>World-Class Makhana, Packed for Export</h2>
            <div className={styles.grid}>
              {[
                { icon: ShieldCheck, title: "FSSAI & Export Certified", desc: "All batches certified for international food safety standards. Lab test reports provided." },
                { icon: Package, title: "Export-Grade Packaging", desc: "Moisture-proof, vacuum-sealed packaging suitable for long-distance shipping." },
                { icon: Ship, title: "Global Logistics", desc: "Experienced in international shipping via sea and air freight to all major destinations." },
                { icon: FileCheck, title: "Complete Documentation", desc: "Phytosanitary certificates, bill of lading, commercial invoice, packing list provided." },
                { icon: Globe, title: "Customs & Compliance", desc: "We handle all export documentation and customs clearance for hassle-free delivery." },
                { icon: ShieldCheck, title: "Consistent Quality", desc: "Every batch is hand-graded by suta size with strict quality control protocols." },
              ].map(item => (
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
          <h2>Looking for Premium Makhana for Export?</h2>
          <p>Get export pricing, grade samples, and shipping timeline within 24 hours.</p>
          <div className={styles.ctaRow}>
            <a href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%20am%20interested%20in%20exporting%20makhana%20from%20India." target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}><MessageCircle size={20} /> Enquire for Export</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
