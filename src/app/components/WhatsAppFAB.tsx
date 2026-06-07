"use client";

import { MessageCircle } from "lucide-react";
import styles from "./WhatsAppFAB.module.css";

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/918949359415?text=Hi%20Khirri%2C%20I%27d%20like%20to%20know%20more%20about%20your%20Makhana."
      className={styles.fab}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Khirri on WhatsApp"
      id="whatsapp-fab"
    >
      <MessageCircle size={26} strokeWidth={2} className={styles.icon} />
      <span className={styles.tooltip}>Chat on WhatsApp</span>
    </a>
  );
}
