import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";

const validCities = ["jaipur", "bangalore"];

const cityData = {
  jaipur: {
    name: "Jaipur",
    state: "Rajasthan",
    title: "Premium Wholesale Makhana Supplier in Jaipur | Khirri",
    description: "Source premium bulk Phool Makhana directly in Jaipur. Khirri is the top-rated Makhana supplier and dark store partner in Rajasthan for B2B and retail.",
    phone: "+918949359415",
    address: "AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
    faq: [
      {
        q: "What is the wholesale price of Makhana in Jaipur?",
        a: "Makhana prices in Jaipur fluctuate based on harvest yield and grading. As a direct-from-farm supplier, Khirri offers the most competitive B2B rates for 12mm+ and 16mm+ grades. Contact us for today's bulk pricing."
      },
      {
        q: "Do you supply to dark stores in Jaipur?",
        a: "Yes! We partner with quick-commerce and dark stores across Jaipur to ensure 10-minute delivery apps have constant access to premium Khirri Fox Nuts."
      }
    ]
  },
  bangalore: {
    name: "Bangalore",
    state: "Karnataka",
    title: "Premium Wholesale Makhana Supplier in Bangalore | Khirri",
    description: "Looking for reliable Makhana sourcing in Bangalore? Khirri ships farm-fresh Bihar Phool Makhana directly to Bangalore for wholesale, B2B, and retail.",
    phone: "+918949359415",
    address: "Direct Supply Chain from Bihar to Bangalore",
    faq: [
      {
        q: "How do I get Makhana from Bihar to Bangalore?",
        a: "Khirri handles the entire logistics chain. We source hand-graded fox nuts directly from Bihar farms and manage secure, fast freight directly to your warehouse or retail outlet in Bangalore."
      },
      {
        q: "What are the Makhana prices in Bangalore?",
        a: "Wholesale prices in Bangalore depend on the order volume and grade (e.g., Hand-picked 16mm vs standard). We guarantee highly competitive pan-India pricing because we eliminate the middlemen."
      }
    ]
  }
};

export async function generateStaticParams() {
  return validCities.map((city) => ({
    city: city,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = cityData[resolvedParams.city as keyof typeof cityData];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://khirri.com/locations/${resolvedParams.city}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const city = resolvedParams.city.toLowerCase();
  
  if (!validCities.includes(city)) {
    notFound();
  }

  const data = cityData[city as keyof typeof cityData];

  // LocalBusiness Schema tailored to the city
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["FoodStore", "WholesaleStore"],
    "name": `Khirri Makhana - ${data.name}`,
    "description": data.description,
    "url": `https://khirri.com/locations/${city}`,
    "telephone": data.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.state,
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Wholesale Makhana Supplier in <span className={styles.highlight}>{data.name}</span></h1>
            <p className={styles.subtitle}>
              Direct from Bihar farms to your business in {data.name}. Premium fox nuts for retail, dark stores, and wholesale B2B distribution.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="https://wa.me/918949359415" target="_blank" className={styles.primaryBtn}>
                Get Bulk Pricing
              </Link>
            </div>
          </div>
        </header>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.textContent}>
                <h2>Why Source Makhana with Khirri in {data.name}?</h2>
                <p>
                  Sourcing authentic, high-quality Phool Makhana outside of Bihar can be challenging. Many suppliers mix grades or provide stale crops. At Khirri, we solve the <strong>farm-to-{data.name}</strong> logistics problem.
                </p>
                <ul className={styles.benefitsList}>
                  <li>✓ <strong>Direct Sourcing:</strong> No middlemen. Straight from the ponds of Bihar.</li>
                  <li>✓ <strong>Strict Grading:</strong> We supply pure 12mm+ and 16mm+ grades without breakage.</li>
                  <li>✓ <strong>Reliable Logistics:</strong> Guaranteed safe transit to {data.name}.</li>
                  <li>✓ <strong>B2B Focused:</strong> Specialized pricing and packaging for wholesale buyers and quick-commerce dark stores.</li>
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3>Contact {data.name} Sales</h3>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>Available:</strong> Mon-Sat, 10:00 AM - 6:00 PM</p>
                <p className={styles.addressBox}>{data.address}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <h2>Frequently Asked Questions ({data.name})</h2>
            <div className={styles.faqGrid}>
              {data.faq.map((item, index) => (
                <div key={index} className={styles.faqCard}>
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WhatsAppFAB />
      <Footer />
    </>
  );
}
