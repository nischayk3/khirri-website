import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Khirri | Makhana Supplier Vaishali Nagar, Jaipur",
  description: "Visit our store in Vaishali Nagar, Jaipur. Call +91 89493 59415 or WhatsApp for bulk makhana inquiries, pricing, and sample requests. Open daily 10 AM - 10 PM.",
  alternates: { canonical: "https://khirri.com/contact" },
};

const contactMethods = [
  { icon: MapPin, title: "Visit Our Store", desc: "AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur 302021", link: "https://maps.google.com/?q=26.9111487,75.7358259", cta: "Get Directions →" },
  { icon: Phone, title: "Call Us", desc: "+91 89493 59415", link: "tel:+918949359415", cta: "Call Now →" },
  { icon: Mail, title: "Email", desc: "hello@khirri.com", link: "mailto:hello@khirri.com", cta: "Send Email →" },
  { icon: MessageCircle, title: "WhatsApp", desc: "Quickest response. Bulk orders, samples, pricing.", link: "https://wa.me/918949359415", cta: "Chat on WhatsApp →" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get in Touch</h1>
            <p className={styles.heroSubtitle}>
              Whether you&apos;re a business looking for bulk makhana, a cafe wanting cookies,
              or a customer who loves quality products — we&apos;re here to help.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {contactMethods.map((m) => (
                <a key={m.title} href={m.link} target={m.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={styles.card}>
                  <div className={styles.cardIcon}><m.icon size={28} /></div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <span className={styles.cardCta}>{m.cta}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Store Info + Map */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.storeGrid}>
              <div className={styles.storeInfo}>
                <h2>Visit Our Store in Vaishali Nagar</h2>
                <div className={styles.detailRow}>
                  <MapPin size={18} />
                  <div>
                    <strong>Address</strong>
                    <p>AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021</p>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <Clock size={18} />
                  <div>
                    <strong>Store Hours</strong>
                    <p>Monday - Sunday: 10:00 AM – 10:00 PM</p>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <Phone size={18} />
                  <div>
                    <strong>Phone</strong>
                    <p>+91 89493 59415</p>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=26.9111487,75.7358259" target="_blank" rel="noopener noreferrer" className={styles.mapBtn}>
                  Open in Google Maps →
                </a>
              </div>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.4!2d75.7358!3d26.9111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6a62b4d19c5a389!2sKhirri%20Phool%20Makhana!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Khirri Phool Makhana — Vaishali Nagar, Jaipur"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick CTA */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Need Bulk Pricing?</h2>
            <p>Get live pricing, availability, and delivery timeline within 2 hours on WhatsApp.</p>
            <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              <MessageCircle size={20} />
              Enquire on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
