import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import { faqSchema } from "@/lib/schema";

const validCities = ["jaipur", "bangalore", "delhi", "mumbai", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad"];

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
  },
  delhi: {
    name: "Delhi",
    state: "Delhi",
    title: "Premium Makhana Supplier in Delhi — Bulk & Retail | Khirri",
    description: "Get premium quality Phool Makhana delivered to Delhi NCR. Khirri supplies bulk raw makhana, makhana cookies, and dry fruits to businesses and homes across Delhi.",
    phone: "+918949359415",
    address: "Direct Supply to Delhi NCR from our Jaipur hub",
    faq: [
      {
        q: "How fast can you deliver makhana to Delhi?",
        a: "We deliver to Delhi NCR within 3-4 business days from our Jaipur hub. Same-day dispatch for orders placed before 12 PM."
      },
      {
        q: "Do you supply makhana to restaurants in Delhi?",
        a: "Yes, we supply bulk makhana to restaurants, cafes, and hotels across Delhi. Competitive wholesale pricing with FSSAI certification."
      }
    ]
  },
  mumbai: {
    name: "Mumbai",
    state: "Maharashtra",
    title: "Premium Makhana Supplier in Mumbai — B2B & Retail | Khirri",
    description: "Order premium Phool Makhana in Mumbai. Khirri delivers fresh, hand-graded fox nuts from Bihar to your doorstep in Mumbai. Bulk B2B supply available.",
    phone: "+918949359415",
    address: "Direct Supply to Mumbai from our Jaipur hub",
    faq: [
      {
        q: "What is the makhana price in Mumbai?",
        a: "Khirri offers competitive pricing for Mumbai buyers starting from ₹900/kg for 4 Suta grade. Prices include GST and moisture-protected packaging."
      },
      {
        q: "Do you supply makhana to dabbawalas or tiffin services?",
        a: "Yes, we work with food businesses across Mumbai. Bulk orders with custom packaging available."
      }
    ]
  },
  pune: {
    name: "Pune",
    state: "Maharashtra",
    title: "Premium Makhana Supplier in Pune | Khirri",
    description: "Get premium quality Phool Makhana delivered to Pune. Khirri supplies bulk makhana and dry fruits to businesses, health stores, and homes across Pune.",
    phone: "+918949359415",
    address: "Direct Supply to Pune from our Jaipur hub",
    faq: [
      {
        q: "Do you deliver makhana to Pune?",
        a: "Yes, we ship to all areas of Pune including Kharadi, Hinjawadi, Baner, Koregaon Park, and Viman Nagar. Delivery within 4-5 business days."
      },
      {
        q: "What bulk quantities are available for Pune businesses?",
        a: "We offer 8kg sacks up to 500kg+ for Pune businesses. Volume discounts available for regular orders."
      }
    ]
  },
  hyderabad: {
    name: "Hyderabad",
    state: "Telangana",
    title: "Premium Makhana Supplier in Hyderabad | Khirri",
    description: "Order premium Phool Makhana in Hyderabad. Khirri hand-grades and delivers the finest fox nuts from Bihar to homes and businesses in Hyderabad.",
    phone: "+918949359415",
    address: "Direct Supply to Hyderabad from our Jaipur hub",
    faq: [
      {
        q: "Do you deliver to Hyderabad?",
        a: "Yes, we deliver to all areas of Hyderabad including Gachibowli, Hitech City, Madhapur, Jubilee Hills, and Banjara Hills. 5-6 business days delivery."
      },
      {
        q: "What grades of makhana do you supply to Hyderabad?",
        a: "We supply 4 Suta, 5+ Suta, and 6+ Jumbo grades. All hand-graded and FSSAI certified."
      }
    ]
  },
  chennai: {
    name: "Chennai",
    state: "Tamil Nadu",
    title: "Premium Makhana Supplier in Chennai | Khirri",
    description: "Looking for premium makhana in Chennai? Khirri delivers fresh, hand-graded Phool Makhana from Bihar to Chennai. B2B and retail orders welcome.",
    phone: "+918949359415",
    address: "Direct Supply to Chennai from our Jaipur hub",
    faq: [
      {
        q: "Do you ship makhana to Chennai?",
        a: "Yes, we ship to all parts of Chennai including OMR, ECR, Velachery, Anna Nagar, and T Nagar. Delivery within 5-7 business days."
      },
      {
        q: "Is makhana popular in South Indian cuisine?",
        a: "While traditionally more common in North India, makhana is growing rapidly in popularity across South India as a healthy snack. It's also used in traditional Iyer weddings and fasting dishes."
      }
    ]
  },
  kolkata: {
    name: "Kolkata",
    state: "West Bengal",
    title: "Premium Makhana Supplier in Kolkata | Khirri",
    description: "Get premium Phool Makhana delivered to Kolkata. Khirri supplies hand-graded fox nuts from Bihar at competitive wholesale and retail prices.",
    phone: "+918949359415",
    address: "Direct Supply to Kolkata from Bihar via our Jaipur hub",
    faq: [
      {
        q: "How close is your supply chain to West Bengal?",
        a: "Khirri sources directly from Bihar, which shares a border with West Bengal. This means faster delivery to Kolkata — typically 3-4 business days."
      },
      {
        q: "Do you offer discounts for bulk orders in Kolkata?",
        a: "Yes, we offer volume-based discounts for Kolkata buyers. Contact us on WhatsApp for a custom quote based on your order size."
      }
    ]
  },
  ahmedabad: {
    name: "Ahmedabad",
    state: "Gujarat",
    title: "Premium Makhana Supplier in Ahmedabad | Khirri",
    description: "Order premium Phool Makhana in Ahmedabad. Khirri delivers fresh, hand-graded fox nuts from Bihar to businesses and homes across Ahmedabad.",
    phone: "+918949359415",
    address: "Direct Supply to Ahmedabad from our Jaipur hub",
    faq: [
      {
        q: "What is the delivery time to Ahmedabad?",
        a: "We deliver to Ahmedabad within 4-5 business days. Being close to Jaipur, Gujarat orders arrive faster than most other states."
      },
      {
        q: "Do you supply makhana for fasting (vrat/upvas) in Gujarat?",
        a: "Yes! Makhana is a popular fasting food in Gujarat. We supply pure, unflavored makhana perfect for Navratri, Ekadashi, and other fasting days."
      }
    ]
  },
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
    "@type": ["FoodStore", "GroceryStore", "Store"],
    "name": `Khirri Makhana - ${data.name}`,
    "description": data.description,
    "url": `https://khirri.com/locations/${city}`,
    "telephone": data.phone,
    "priceRange": "₹₹",
    "areaServed": [
      { "@type": "City", "name": data.name },
      { "@type": "State", "name": data.state },
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.name,
      "addressRegion": data.state,
      "addressCountry": "IN"
    }
  };

  const faqSchemaData = faqSchema(data.faq);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
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
