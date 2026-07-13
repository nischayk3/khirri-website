"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import styles from "./ContactCTA.module.css";

const contactInfo = [
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    value: "hello@khirri.com",
    href: "mailto:hello@khirri.com",
  },
  {
    id: "contact-location",
    icon: MapPin,
    label: "Head Office",
    value: "Vaishali Nagar, Jaipur, Rajasthan",
    href: "https://maps.google.com/?q=Vaishali+Nagar,+Jaipur,+Rajasthan",
  },
  {
    id: "contact-hours",
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat · 9:00 AM – 7:00 PM IST",
    href: null,
  },
];

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMsg = encodeURIComponent(
      `Hi Khirri! My name is ${form.name}.\n\nMessage: ${form.message}\n\nPhone: ${form.phone}`
    );
    window.open(`https://wa.me/918949359415?text=${waMsg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className={styles.card}>
          {/* Left — Text + Contact Info */}
          <div className={styles.left}>
            <span className={`section-eyebrow ${styles.eyebrow}`}>
              Get in Touch
            </span>
            <h2
              id="contact-heading"
              className={`section-title ${styles.heading}`}
            >
              Enquire or Place
              <br />
              a Bulk Order
            </h2>
            <p className={styles.desc}>
              We believe the best deals happen through conversations, not carts.
              Reach out directly for custom quantities, private-label packaging,
              and the best wholesale rates — we respond within hours.
            </p>

            {/* CTA buttons */}
            <div className={styles.ctaButtons}>
              <Link
                href="/shop"
                className={`btn btn-primary btn-lg`}
                id="contact-shop-btn"
              >
                Shop Online
              </Link>
              <a
                href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20enquire%20about%20bulk%20Makhana."
                className={`btn btn-outline-white btn-lg`}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>

            {/* Contact info */}
            <ul className={styles.infoList} role="list">
              {contactInfo.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.id} id={c.id} className={styles.infoItem}>
                    <div className={styles.infoIcon} aria-hidden="true">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className={styles.infoLabel}>{c.label}</p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className={styles.infoValue}
                          target={c.href.startsWith("https://maps") ? "_blank" : undefined}
                          rel={c.href.startsWith("https://maps") ? "noopener noreferrer" : undefined}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className={styles.infoValue}>{c.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — Quick Form */}
          <div className={styles.right}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Quick Enquiry</h3>
              <p className={styles.formSubtitle}>
                We'll get back to you on WhatsApp within 2 hours.
              </p>

              {submitted ? (
                <div className={styles.successMsg} role="alert">
                  <CheckCircle2 size={32} className={styles.successIcon} />
                  <p>Opening WhatsApp with your message...</p>
                  <p className={styles.successSub}>You'll hear from us within 2 hours!</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={styles.form}
                  noValidate
                  aria-label="Enquiry form"
                >
                  <div className={styles.field}>
                    <label htmlFor="enquiry-name" className={styles.label}>
                      Your Name *
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      className={styles.input}
                      placeholder="e.g. Ramesh Gupta"
                      required
                      minLength={2}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="enquiry-phone" className={styles.label}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      className={styles.input}
                      placeholder="+91 98765 XXXXX"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      autoComplete="tel"
                      pattern="[0-9+\-\s]{7,15}"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="enquiry-message" className={styles.label}>
                      What do you need?
                    </label>
                    <textarea
                      id="enquiry-message"
                      className={`${styles.input} ${styles.textarea}`}
                      rows={4}
                      placeholder="e.g. I need 200kg of raw Makhana per month for my namkeen shop in Jaipur..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    id="enquiry-submit-btn"
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
