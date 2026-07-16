import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Khirri Phool Makhana",
  description: "Khirri Trading Company terms and conditions for online orders, shipping, returns, and B2B supply agreements.",
  alternates: { canonical: "https://khirri.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "100px", paddingBottom: "60px", maxWidth: "800px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
        <h1>Terms & Conditions</h1>
        <p className="text-muted" style={{ marginBottom: "2rem" }}>Last updated: July 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing khirri.com and placing an order, you agree to be bound by these terms. If you do not agree, please do not use our website.</p>

        <h2>2. Products & Pricing</h2>
        <p>All prices are in Indian Rupees (INR) and inclusive of applicable taxes. Product images are for illustration; actual products may vary slightly. We reserve the right to modify prices without prior notice.</p>

        <h2>3. Orders & Payment</h2>
        <p>Orders are confirmed upon payment receipt. We accept prepaid payments via Razorpay (credit/debit cards, UPI, net banking) and Cash on Delivery (COD) with a surcharge of ₹50.</p>

        <h2>4. Shipping & Delivery</h2>
        <p>Free delivery on orders above ₹499. Standard delivery charge of ₹49 for orders below ₹499. Estimated delivery: 5-7 business days pan-India via ShipRocket. We are not liable for delays caused by courier partners.</p>

        <h2>5. Returns & Refunds</h2>
        <p>Given the food nature of our products, returns are accepted only for damaged or defective items reported within 48 hours of delivery with photographic evidence. Refunds are processed within 7-10 business days.</p>

        <h2>6. B2B / Bulk Orders</h2>
        <p>Bulk orders (8kg+) are subject to separate terms agreed upon during enquiry. Sample batches are available for quality verification before bulk purchases.</p>

        <h2>7. Intellectual Property</h2>
        <p>All content on khirri.com — including text, images, logos, and product descriptions — is the property of Khirri Trading Company and may not be reproduced without permission.</p>

        <h2>8. Limitation of Liability</h2>
        <p>Khirri Trading Company shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>

        <h2>9. Governing Law</h2>
        <p>These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Jaipur, Rajasthan.</p>

        <h2>10. Contact</h2>
        <p>For queries: <a href="mailto:hello@khirri.com">hello@khirri.com</a> or <a href="tel:+918949359415">+91 89493 59415</a>.</p>
      </main>
      <Footer />
    </>
  );
}
