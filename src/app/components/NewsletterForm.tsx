"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import styles from "./Footer.module.css";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simple mailto-based signup — in production, connect to email API
    const mailto = `mailto:khirri.official@gmail.com?subject=Newsletter Signup&body=Email: ${email}`;
    window.open(mailto);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newsletterForm}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.newsletterInput}
        aria-label="Email for newsletter"
      />
      <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
        {submitted ? <CheckCircle2 size={16} /> : <Send size={16} />}
      </button>
    </form>
  );
}
