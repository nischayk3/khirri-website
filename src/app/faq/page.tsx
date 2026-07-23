import type { Metadata } from "next";
import { Search, MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFAB from "@/app/components/WhatsAppFAB";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "Makhana FAQ — Everything About Fox Nuts Answered | Khirri",
  description: "50+ frequently asked questions about makhana (fox nuts) answered. Health benefits, nutrition, recipes, storage, pricing, bulk buying, and more. Your complete makhana resource.",
  alternates: { canonical: "https://khirri.com/faq" },
};

const faqCategories = [
  {
    title: "Makhana Basics",
    questions: [
      { q: "What is makhana (phool makhana)?", a: "Makhana, also known as fox nuts or phool makhana, is the popped seed of the Euryale ferox plant. It's a light, crunchy superfood native to Bihar, India, known for its high protein, low fat, and gluten-free properties." },
      { q: "Is makhana a nut?", a: "No, makhana is technically a seed, not a nut. It comes from the lotus plant family. This makes it safe for people with tree nut allergies." },
      { q: "What does makhana taste like?", a: "Makhana has a mild, neutral flavor that's slightly nutty. It easily absorbs the taste of any seasoning, making it versatile for both savory and sweet dishes." },
      { q: "Is makhana a superfood?", a: "Yes, makhana is widely regarded as a superfood due to its high protein content, low glycemic index, rich antioxidant profile, and abundance of minerals like calcium, magnesium, and potassium." },
      { q: "What is the difference between makhana and phool makhana?", a: "There is no difference — phool makhana literally means 'puffed makhana' in Hindi. It's the same product, just describing the popped form." },
      { q: "Is makhana a dry fruit?", a: "Makhana is not a dry fruit. It's a popped seed/grain. However, it's often sold in dry fruit shops and categorized alongside nuts and dry fruits." },
      { q: "Does makhana contain gluten?", a: "No, makhana is 100% naturally gluten-free. It's a safe snack option for people with celiac disease or gluten sensitivity." },
      { q: "Is makhana vegan?", a: "Yes, makhana is entirely plant-based and vegan-friendly. It becomes non-vegan only if cooked with ghee (clarified butter)." },
    ],
  },
  {
    title: "Health & Nutrition",
    questions: [
      { q: "Is makhana good for weight loss?", a: "Yes, makhana is excellent for weight loss. It's low in calories (347 kcal/100g), virtually fat-free (<1g fat), high in fiber (14.5g/100g), and contains protein that keeps you full longer. A 30g serving is only ~100 calories." },
      { q: "Can diabetics eat makhana?", a: "Yes, makhana is highly recommended for diabetics. It has a low glycemic index (GI under 50), meaning it releases sugar slowly into the bloodstream and prevents blood sugar spikes." },
      { q: "Is makhana safe during pregnancy?", a: "Yes, makhana is safe and nutritious during pregnancy. It provides calcium for fetal bone development, iron for blood health, magnesium for muscle function, and protein. Always consult your doctor first." },
      { q: "Can babies eat makhana?", a: "Yes, babies can eat makhana from 8-10 months onwards. Start with makhana powder or porridge (fine powder mixed with milk or dal water). For toddlers, lightly roasted crushed makhana makes a great finger food." },
      { q: "Is makhana good for heart health?", a: "Absolutely. Makhana is low in sodium and cholesterol, rich in magnesium which helps regulate blood pressure, and contains antioxidants like kaempferol that reduce inflammation and oxidative stress." },
      { q: "Does makhana help with digestion?", a: "Yes, the high fiber content in makhana (14.5g per 100g) promotes healthy digestion, prevents constipation, and supports gut health." },
      { q: "Is makhana good for skin?", a: "Makhana is rich in antioxidants that combat free radicals and slow aging. The kaempferol in makhana helps repair damaged proteins, improving skin elasticity and reducing wrinkles." },
      { q: "Can I eat makhana every day?", a: "Yes, makhana is safe for daily consumption. A serving of 30-40g (about a handful) per day is recommended. It's a healthy alternative to processed snacks." },
    ],
  },
  {
    title: "Buying & Pricing",
    questions: [
      { q: "What is the price of makhana per kg?", a: "Makhana prices vary by grade. At Khirri, bulk prices start at ₹900/kg for 4 Suta grade, ₹1,100/kg for 5+ Suta, and ₹1,400/kg for 6+ Jumbo export grade. Retail packs are available from ₹349 for 250g." },
      { q: "What is the wholesale price of makhana in Jaipur?", a: "Khirri offers wholesale makhana prices in Jaipur starting from ₹900/kg for 4 Suta grade (MOQ 8kg). Volume discounts available for 50kg+ orders." },
      { q: "Where to buy makhana in bulk?", a: "Khirri is a trusted bulk makhana supplier based in Jaipur. We supply pan-India with MOQ starting at 8kg. WhatsApp us at +91 89493 59415 for bulk pricing." },
      { q: "Do you offer free delivery?", a: "Free delivery is available on orders above ₹2,499 within Jaipur. For other locations, shipping charges apply based on weight and distance." },
      { q: "What is your minimum order quantity (MOQ)?", a: "For retail, there's no minimum order. For bulk/B2B, our MOQ is 8kg (one sack). For larger volumes, we offer discounted pricing on 25kg, 50kg, and 100kg+ orders." },
      { q: "Do you ship outside India?", a: "Currently, we deliver across India. For international orders, please contact us on WhatsApp for a custom quote." },
      { q: "How long does delivery take?", a: "For orders within Jaipur: 1-2 days. For pan-India: 5-7 business days. Bulk orders are dispatched within 48 hours of confirmation." },
      { q: "Is payment COD available?", a: "Yes, Cash on Delivery is available for orders within India. We also accept UPI, Credit/Debit Cards, and Net Banking via Razorpay." },
    ],
  },
  {
    title: "Storage & Shelf Life",
    questions: [
      { q: "How to store makhana at home?", a: "Store makhana in an airtight container in a cool, dry place away from direct sunlight. Avoid moisture exposure as makhana absorbs moisture and loses its crunch." },
      { q: "How long does makhana last?", a: "Properly stored raw makhana has a shelf life of 6-9 months. Roasted/flavored makhana lasts 3-4 months in an airtight container." },
      { q: "Can makhana be refrigerated?", a: "It's not necessary but you can refrigerate makhana in an airtight container to extend shelf life. Let it come to room temperature before opening to avoid moisture condensation." },
      { q: "How to restore crunch to soft makhana?", a: "If makhana has gone soft, spread it on a baking tray and roast in a preheated oven at 150°C for 5-7 minutes. Alternatively, microwave for 30-60 seconds." },
    ],
  },
  {
    title: "Recipes & Usage",
    questions: [
      { q: "How to eat makhana?", a: "Makhana can be eaten raw, dry roasted, roasted in ghee, or seasoned with spices. It's also used in kheer, curries, chivda, and even smoothies." },
      { q: "How to roast makhana at home?", a: "Heat 1 tsp ghee or oil in a pan on low flame. Add 2 cups makhana and roast for 5-7 minutes, stirring continuously until crispy. Add spices and toss well." },
      { q: "Can makhana be eaten raw?", a: "Yes, makhana can be eaten raw but it's much softer and chewier. Roasting brings out the crunch and enhances the flavor significantly." },
      { q: "What are popular makhana recipes?", a: "Popular recipes include masala makhana, makhana kheer, makhana chivda, caramel makhana, makhana raita, and makhana curry. Check our blog for detailed recipes." },
      { q: "Can makhana be used in smoothies?", a: "Yes, roasted makhana powder adds a protein boost to smoothies. Grind roasted makhana into a fine powder and add to your favorite smoothie recipe." },
    ],
  },
  {
    title: "B2B & Wholesale",
    questions: [
      { q: "Do you supply makhana to businesses?", a: "Yes, Khirri supplies bulk makhana to namkeen shops, retailers, brands, dark stores, cafes, and hotels across India. We offer competitive wholesale pricing." },
      { q: "Do you offer private label makhana?", a: "Yes, we offer private label and custom packaging services. Starting at ₹5,999, we handle grading, packaging, and labeling for your brand. Contact us for details." },
      { q: "What suta grades do you supply?", a: "We supply 4 Suta (12-14mm commercial), 5+ Suta (15-19mm premium), and 6+ Jumbo (19mm+ export grade). Each grade is hand-graded for consistency." },
      { q: "Is Khirri makhana FSSAI certified?", a: "Yes, all Khirri makhana is fully FSSAI certified and lab-tested. We provide quality certificates with every bulk order." },
      { q: "Do you export makhana?", a: "Yes, we export premium makhana to international markets. We handle all documentation, FSSAI export certification, and logistics." },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap(c => c.questions);
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Makhana FAQ</h1>
            <p className={styles.heroSubtitle}>Everything you need to know about makhana (fox nuts) — from health benefits to bulk buying. 50+ questions answered.</p>
            <div className={styles.searchBox}>
              <Search size={18} />
              <input type="text" placeholder="Search questions..." className={styles.searchInput} id="faq-search" />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            {faqCategories.map((category) => (
              <div key={category.title} className={styles.category}>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <div className={styles.faqList}>
                  {category.questions.map((faq, i) => (
                    <details key={i} className={styles.faqItem}>
                      <summary className={styles.faqQuestion}>
                        {faq.q}
                        <span className={styles.faqToggle}>+</span>
                      </summary>
                      <div className={styles.faqAnswer}>
                        <p>{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Still have questions?</h2>
            <p>We&apos;re here to help. Get in touch via WhatsApp or call us.</p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/918949359415" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                <MessageCircle size={18} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
