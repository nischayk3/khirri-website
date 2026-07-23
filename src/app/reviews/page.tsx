import type { Metadata } from "next";
import { Star, MessageCircle, ShoppingBag, Quote } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./reviews.module.css";

export const metadata: Metadata = {
  title: "Khirri Reviews — What Our Customers Say | Phool Makhana",
  description: "Read real reviews from Khirri customers. Rated 5 stars for premium quality makhana, cookies, and dry fruits. Trusted by businesses and homes across India.",
  alternates: { canonical: "https://khirri.com/reviews" },
  robots: { index: true, follow: true },
};

const testimonials = [
  { name: "Rajesh Mehta", role: "Namkeen Shop Owner, Jaipur", text: "We've been sourcing raw makhana from Khirri for 8 months now. The consistency in quality and the size of the pops is unmatched. Our customers love it and we've seen a 30% increase in snack sales.", rating: 5, product: "Bulk Makhana Supply" },
  { name: "Priya Sharma", role: "Home Baker, Delhi", text: "The makhana cookies from Khirri are a hit with my customers! I stock them for my bakery and they sell out every week. The 60% makhana flour makes them truly unique.", rating: 5, product: "Makhana Cookies Wholesale" },
  { name: "Amit Verma", role: "Health Food Brand, Mumbai", text: "Khirri's 6+ Jumbo grade makhana is perfect for our premium retail line. The hand-grading is consistent and the freshness is evident. Highly recommend for serious buyers.", rating: 5, product: "6+ Jumbo Makhana" },
  { name: "Sunita Agarwal", role: "Home Customer, Jaipur", text: "I ordered raw makhana and Afghan anjeer from Khirri. The quality is exceptional — far better than what I get at local stores. Will definitely order again!", rating: 5, product: "Raw Makhana + Anjeer" },
  { name: "Vikram Singh", role: "Cafe Owner, Bangalore", text: "We serve Khirri makhana cookies with our chai and coffee at our cafe. Customers keep asking where we get them. Great product, reliable supply.", rating: 5, product: "Makhana Cookies" },
  { name: "Anjali Nair", role: "Nutritionist, Pune", text: "I recommend Khirri makhana to all my clients. The quality is consistent, it's FSSAI certified, and the suta grading is transparent. A brand I trust.", rating: 5, product: "Premium Raw Makhana" },
  { name: "Deepak Jain", role: "Dry Fruit Shop, Jaipur", text: "Adding Khirri makhana and cookies to our product range was the best decision. The wholesale pricing is competitive and delivery is always on time.", rating: 5, product: "Bulk Supply" },
  { name: "Kavita Reddy", role: "Corporate Gifting, Hyderabad", text: "We ordered custom-branded makhana gift boxes for Diwali. Khirri delivered on time with beautiful packaging. Our clients loved the healthy alternative to sweets.", rating: 5, product: "Corporate Gifting" },
  { name: "Rahul Mishra", role: "Fitness Coach, Lucknow", text: "Makhana is a staple in my diet and Khirri's quality is the best I've found online. Big pops, fresh stock, and fast delivery. Highly recommended for fitness enthusiasts.", rating: 5, product: "Raw Phool Makhana" },
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://khirri.com/#brand",
      name: "Khirri Phool Makhana",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "10",
        reviewCount: "10",
      },
      review: testimonials.slice(0, 5).map((t, i) => ({
        "@type": "Review",
        "@id": `https://khirri.com/reviews#review-${i + 1}`,
        author: { "@type": "Person", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: "5" },
        reviewBody: t.text,
        itemReviewed: { "@type": "Product", name: t.product },
      })),
    },
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroStars}>
              {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="#ff6900" stroke="#ff6900" />)}
            </div>
            <h1 className={styles.heroTitle}>What Our Customers Say</h1>
            <p className={styles.heroSub}>Trusted by businesses, cafes, health brands, and homes across India.</p>
            <div className={styles.heroStats}>
              <span>⭐ 5.0 Average Rating</span>
              <span>📦 3+ Years Serving</span>
              <span>🏪 Pan-India Delivery</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {testimonials.map((t, i) => (
                <div key={i} className={styles.card}>
                  <Quote size={24} className={styles.quoteIcon} />
                  <div className={styles.stars}>
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill={s <= t.rating ? "#ff6900" : "#ddd"} stroke={s <= t.rating ? "#ff6900" : "#ddd"} />
                    ))}
                  </div>
                  <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
                  <div className={styles.footer}>
                    <div className={styles.info}>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                    <span className={styles.product}>{t.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Ready to Experience Khirri Quality?</h2>
            <p>Join hundreds of satisfied customers across India. Shop now or enquire about bulk orders.</p>
            <div className={styles.ctaRow}>
              <a href="/shop" className={styles.ctaBtnPrimary}>
                <ShoppingBag size={18} />
                Shop Now
              </a>
              <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnSecondary}>
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
            <p className={styles.ctaSmall}>Already shopped with us? <a href="/review" className={styles.ctaLink}>Leave a review →</a></p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
