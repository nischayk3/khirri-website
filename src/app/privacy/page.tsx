import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Khirri Phool Makhana",
  description: "Khirri Trading Company privacy policy. Learn how we collect, use, and protect your personal information when you shop at khirri.com.",
  alternates: { canonical: "https://khirri.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "800px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted" style={{ marginBottom: "2rem" }}>Last updated: July 2026</p>

        <h2>1. Introduction</h2>
        <p>Khirri Trading Company ("Khirri," "we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website khirri.com.</p>

        <h2>2. Information We Collect</h2>
        <p><strong>Personal Information:</strong> Name, phone number, email address, shipping address, payment information (processed securely via Razorpay).</p>
        <p><strong>Automatically Collected:</strong> IP address, browser type, device information, pages visited, referring URL via Google Analytics and Vercel Analytics.</p>

        <h2>3. How We Use Your Information</h2>
        <p>To process and fulfill your orders, communicate with you about your orders, send marketing communications (with consent), improve our website, and comply with legal obligations.</p>

        <h2>4. Payment Processing</h2>
        <p>All payments are processed securely through Razorpay. We do not store credit/debit card numbers. Razorpay's privacy policy applies to payment data.</p>

        <h2>5. Shipping Data</h2>
        <p>Order shipping information is shared with ShipRocket for delivery purposes. ShipRocket's privacy policy governs their handling of this data.</p>

        <h2>6. Cookies</h2>
        <p>We use cookies for analytics (Google Analytics, Vercel Analytics) and cart functionality. You can control cookies through your browser settings.</p>

        <h2>7. Data Retention</h2>
        <p>We retain your order data as required for tax and accounting purposes (typically 7 years as per Indian law). Marketing data is retained until you unsubscribe.</p>

        <h2>8. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at hello@khirri.com.</p>

        <h2>9. Contact</h2>
        <p>For privacy inquiries: <a href="mailto:hello@khirri.com">hello@khirri.com</a> or call <a href="tel:+918949359415">+91 89493 59415</a>.</p>
      </main>
      <Footer />
    </>
  );
}
