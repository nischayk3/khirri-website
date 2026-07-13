/* ============================================================
   KHIRRI E-COMMERCE — Product Catalog
   Single source of truth for all products, pricing, and variants
   ============================================================ */

import { Product, CouponCode } from "./types";

// ── Product Catalog ──────────────────────────────────────

export const products: Product[] = [
  // ─── Raw Phool Makhana (Hero Product) ───────────────────
  {
    slug: "raw-phool-makhana",
    name: "Raw Phool Makhana",
    tagline: "100% Hand-graded by Suta Size — No mixed batches",
    description:
      "Unlike other brands that mix all sizes together, Khirri brings you transparent 'Suta' grading. We hand-pick and grade our raw Phool Makhana into specific sizes (4, 5, and 6+ Suta) so you know exactly what you are paying for. Sourced directly from Bihar's Mithila region, our makhana is lab-tested, rich in protein, and naturally gluten-free.",
    category: "makhana",
    image: "/images/products/khirri_makhana_original.jpg",
    imageAlt: "Khirri Raw Phool Makhana 250g premium branded pouch",
    gallery: [
      "/images/products/khirri_makhana_original.jpg",
      "/images/makhana_bowl.png",
    ],
    badge: "Best Seller",
    badgeClass: "orange",
    featured: true,
    metaDescription:
      "Buy premium Raw Phool Makhana (fox nuts) online. Hand-graded, lab-tested, sourced from Bihar. Available in 250g, 500g & 1kg packs. Free delivery on orders ≥ ₹499.",
    highlights: [
      "Transparent Suta Grading — Choose your exact size",
      "100% Natural — No preservatives, no additives",
      "24g protein per 100g serving",
      "FSSAI Certified & Lab Tested",
      "Sourced directly from Bihar farmers",
      "Gluten-free, low calorie superfood",
    ],
    nutrition: [
      { label: "Energy", value: "347 kcal per 100g" },
      { label: "Protein", value: "24g per 100g" },
      { label: "Carbohydrates", value: "64g per 100g" },
      { label: "Fat", value: "0.1g per 100g" },
      { label: "Fiber", value: "7.6g per 100g" },
      { label: "Calcium", value: "60mg per 100g" },
    ],
    variants: [
      // Premium Mix
      {
        variantId: "raw-makhana-mix-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 399,
        price: 349,
        inStock: true,
        packagingType: "branded-pouch",
        label: "Most Popular",
        grade: "Premium Mix",
        gradeDescription: "Large 6+ hand-graded. 4, 5, and 6 hand-picked makhana mixed.",
      },
      // 4/4+ Suta
      {
        variantId: "raw-makhana-4suta-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 349,
        price: 300,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "4/4+ Suta",
        gradeDescription: "Standard commercial grade (12-14mm). Excellent value.",
      },
      {
        variantId: "raw-makhana-4suta-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 699,
        price: 599,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "4/4+ Suta",
      },
      {
        variantId: "raw-makhana-4suta-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1299,
        price: 1099,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "4/4+ Suta",
      },
      // 5+ Suta
      {
        variantId: "raw-makhana-5suta-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 399,
        price: 350,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "5+ Suta",
        gradeDescription: "Large premium grade (15-19mm). Ideal for gifting & retail.",
      },
      {
        variantId: "raw-makhana-5suta-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 799,
        price: 699,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "5+ Suta",
      },
      {
        variantId: "raw-makhana-5suta-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1499,
        price: 1299,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "5+ Suta",
      },
      // 6+ Suta
      {
        variantId: "raw-makhana-6suta-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 499,
        price: 415,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "6+ Suta",
        gradeDescription: "Jumbo export grade (19mm+). The largest and whitest pops.",
      },
      {
        variantId: "raw-makhana-6suta-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 999,
        price: 829,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "6+ Suta",
      },
      {
        variantId: "raw-makhana-6suta-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1899,
        price: 1600,
        inStock: true,
        packagingType: "transparent-pack",
        grade: "6+ Suta",
        label: "Best Value",
      },
    ],
  },

  // ─── Makhana Cookies ─────────────────────────────────────
  {
    slug: "makhana-cookies",
    name: "Makhana Cookies",
    tagline: "Wholesome, crunchy, naturally healthy cookies",
    description:
      "India's healthiest cookie — made with 60% Makhana flour. Baked, not fried. Rich in protein, gluten-free, and free from artificial preservatives. The perfect guilt-free snack for tea-time, kids' lunchboxes, or anytime you need a wholesome crunch.",
    category: "cookies",
    image: "/images/products/makhana_cookies_jar.png",
    imageAlt: "Khirri Makhana Cookies jar — made with 60% Makhana, gluten-free",
    gallery: [
      "/images/products/makhana_cookies_jar.png",
    ],
    badge: "New",
    badgeClass: "orange",
    featured: true,
    metaDescription:
      "Buy Khirri Makhana Cookies — made with 60% Makhana. Baked not fried, gluten-free, rich in protein. Order online with free delivery on orders ≥ ₹499.",
    highlights: [
      "Made with 60% Makhana flour",
      "Baked, not fried — low oil content",
      "Rich in protein, naturally healthy",
      "Gluten-free & No artificial preservatives",
      "Perfect for kids, fitness lovers & snack time",
      "Lab tested for quality and safety",
    ],
    nutrition: [
      { label: "Energy", value: "420 kcal per 100g" },
      { label: "Protein", value: "12g per 100g" },
      { label: "Fat", value: "15g per 100g" },
      { label: "Carbohydrates", value: "58g per 100g" },
      { label: "Fiber", value: "4g per 100g" },
    ],
    variants: [
      {
        variantId: "makhana-cookies-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 349,
        price: 300,
        inStock: true,
        packagingType: "jar",
      },
      {
        variantId: "makhana-cookies-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 599,
        price: 500,
        inStock: true,
        packagingType: "jar",
      },
      {
        variantId: "makhana-cookies-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1199,
        price: 1000,
        inStock: true,
        packagingType: "jar",
        label: "Best Value",
      },
    ],
  },

  // ─── Afghan Anjeer ─────────────────────────────────────
  {
    slug: "afghan-anjeer",
    name: "Afghan Anjeer",
    tagline: "Sun-dried figs, rich in fiber & naturally sweet",
    description:
      "Premium sun-dried figs imported from Afghanistan. Naturally sweet with a soft, chewy texture, packed with dietary fiber, potassium, and antioxidants. Perfect as a healthy dessert substitute, in smoothies, or as a standalone snack.",
    category: "dry-fruits",
    image: "/images/products/anjeer_pouch.png",
    imageAlt: "Khirri Afghan Anjeer — premium quality sun-dried figs 250g",
    gallery: [
      "/images/products/anjeer_pouch.png",
    ],
    badge: "Popular",
    badgeClass: "brown",
    metaDescription:
      "Buy premium Afghan Anjeer (dried figs) online. Rich in fiber, naturally sweet, sun-dried. 250g pack from Khirri.",
    highlights: [
      "Premium Afghan origin",
      "Sun-dried, naturally sweet",
      "Rich in dietary fiber & potassium",
      "No added sugar or preservatives",
      "Excellent for digestion and immunity",
    ],
    nutrition: [
      { label: "Energy", value: "249 kcal per 100g" },
      { label: "Protein", value: "3.3g per 100g" },
      { label: "Fat", value: "0.9g per 100g" },
      { label: "Carbohydrates", value: "64g per 100g" },
      { label: "Fiber", value: "9.8g per 100g" },
    ],
    variants: [
      {
        variantId: "afghan-anjeer-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 399,
        price: 325,
        inStock: true,
        packagingType: "bag",
      },
      {
        variantId: "afghan-anjeer-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 749,
        price: 650,
        inStock: true,
        packagingType: "bag",
        label: "Most Popular",
      },
      {
        variantId: "afghan-anjeer-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1499,
        price: 1300,
        inStock: true,
        packagingType: "bag",
        label: "Best Value",
      },
    ],
  },

  // ─── Premium Walnut ─────────────────────────────────────
  {
    slug: "premium-walnut",
    name: "Premium Walnut",
    tagline: "Rich in Omega-3, the ultimate brain food",
    description:
      "Premium quality walnuts, carefully selected for size and freshness. A powerhouse of Omega-3 fatty acids, antioxidants, and essential minerals. Ideal for boosting brain health, heart health, and overall wellness.",
    category: "dry-fruits",
    image: "/images/products/walnut_pouch.png",
    imageAlt: "Khirri Premium Walnuts 200g — rich in Omega-3",
    gallery: [
      "/images/products/walnut_pouch.png",
    ],
    metaDescription:
      "Buy premium walnuts online. Rich in Omega-3, perfect brain food. 200g pack from Khirri.",
    highlights: [
      "Rich in Omega-3 fatty acids",
      "Excellent for brain & heart health",
      "Carefully selected, premium quality",
      "Perfect for snacking, baking, or garnishing",
      "No added salt or flavoring",
    ],
    nutrition: [
      { label: "Energy", value: "654 kcal per 100g" },
      { label: "Protein", value: "15g per 100g" },
      { label: "Fat", value: "65g per 100g" },
      { label: "Carbohydrates", value: "14g per 100g" },
      { label: "Fiber", value: "6.7g per 100g" },
    ],
    variants: [
      {
        variantId: "walnut-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 549,
        price: 450,
        inStock: true,
        packagingType: "bag",
      },
      {
        variantId: "walnut-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 1049,
        price: 900,
        inStock: true,
        packagingType: "bag",
        label: "Most Popular",
      },
      {
        variantId: "walnut-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1999,
        price: 1800,
        inStock: true,
        packagingType: "bag",
        label: "Best Value",
      },
    ],
  },

  // ─── Mixed Millet ─────────────────────────────────────
  {
    slug: "mixed-millet",
    name: "Mixed Millet",
    tagline: "6 ancient super grains blend — wholesome & nutritious",
    description:
      "A carefully curated blend of 6 ancient super grains — Ragi, Jowar, Bajra, Foxtail Millet, Kodo Millet, and Little Millet. Rich in fiber, iron, and essential minerals. Perfect for making healthy rotis, porridge, or adding to your daily diet.",
    category: "super-grains",
    image: "/images/products/millet_pouch.png",
    imageAlt: "Khirri Mixed Millet 400g — 6 ancient super grains blend",
    gallery: [
      "/images/products/millet_pouch.png",
    ],
    badge: "Healthy",
    badgeClass: "green",
    metaDescription:
      "Buy Mixed Millet blend online — 6 ancient super grains. Rich in fiber & iron. 400g pack from Khirri.",
    highlights: [
      "Blend of 6 ancient super grains",
      "Rich in fiber, iron & minerals",
      "Gluten-free & wholesome",
      "Perfect for rotis, porridge & more",
      "No added preservatives",
    ],
    nutrition: [
      { label: "Energy", value: "340 kcal per 100g" },
      { label: "Protein", value: "11g per 100g" },
      { label: "Fat", value: "3.5g per 100g" },
      { label: "Carbohydrates", value: "67g per 100g" },
      { label: "Fiber", value: "8g per 100g" },
      { label: "Iron", value: "4.5mg per 100g" },
    ],
    variants: [
      {
        variantId: "mixed-millet-250g",
        weight: "250g",
        weightGrams: 250,
        mrp: 399,
        price: 325,
        inStock: true,
        packagingType: "bag",
      },
      {
        variantId: "mixed-millet-500g",
        weight: "500g",
        weightGrams: 500,
        mrp: 749,
        price: 650,
        inStock: true,
        packagingType: "bag",
        label: "Most Popular",
      },
      {
        variantId: "mixed-millet-1kg",
        weight: "1 kg",
        weightGrams: 1000,
        mrp: 1499,
        price: 1300,
        inStock: true,
        packagingType: "bag",
        label: "Best Value",
      },
    ],
  },


  // ─── Bulk B2B Supply ─────────────────────────────────────
  {
    slug: "bulk-supply",
    name: "Bulk B2B Supply",
    tagline: "Raw Makhana by Suta Grade · 8kg & 10kg Sacks · Wholesale pan-India",
    description:
      "Wholesale raw Makhana supply for businesses across India. Graded carefully into 4, 5, and 6+ Suta sizes. Direct farm sourcing means unbeatable bulk prices with consistent quality. Ideal for retail repackaging, processing, or commercial kitchens.",
    category: "bulk",
    image: "/images/products/makhana_sack.png",
    imageAlt: "Bulk makhana wholesale supply from Khirri",
    badge: "B2B",
    badgeClass: "dark",
    featured: false,
    variants: [
      // 4/4+ Suta
      {
        variantId: "bulk-4suta-8kg",
        weight: "8 kg",
        weightGrams: 8000,
        mrp: 8792, // 1099 * 8
        price: 7200, // 900/kg
        inStock: true,
        packagingType: "bag",
        grade: "4/4+ Suta",
        gradeDescription: "Commercial grade bulk sack. ₹900/kg effective rate.",
      },
      {
        variantId: "bulk-4suta-10kg",
        weight: "10 kg",
        weightGrams: 10000,
        mrp: 10990, // 1099 * 10
        price: 9000, // 900/kg
        inStock: true,
        packagingType: "bag",
        grade: "4/4+ Suta",
      },
      // 5+ Suta
      {
        variantId: "bulk-5suta-8kg",
        weight: "8 kg",
        weightGrams: 8000,
        mrp: 10392, // 1299 * 8
        price: 8800, // 1100/kg
        inStock: true,
        packagingType: "bag",
        grade: "5+ Suta",
        gradeDescription: "Premium grade bulk sack. ₹1,100/kg effective rate.",
      },
      {
        variantId: "bulk-5suta-10kg",
        weight: "10 kg",
        weightGrams: 10000,
        mrp: 12990, // 1299 * 10
        price: 11000, // 1100/kg
        inStock: true,
        packagingType: "bag",
        grade: "5+ Suta",
        label: "Most Popular",
      },
      // 6+ Suta
      {
        variantId: "bulk-6suta-8kg",
        weight: "8 kg",
        weightGrams: 8000,
        mrp: 12800, // 1600 * 8
        price: 11200, // 1400/kg
        inStock: true,
        packagingType: "bag",
        grade: "6+ Suta",
        gradeDescription: "Jumbo export grade bulk sack. ₹1,400/kg effective rate.",
      },
      {
        variantId: "bulk-6suta-10kg",
        weight: "10 kg",
        weightGrams: 10000,
        mrp: 16000, // 1600 * 10
        price: 14000, // 1400/kg
        inStock: true,
        packagingType: "bag",
        grade: "6+ Suta",
        label: "Best Value",
      },
    ],
  },
];

// ── Helper Functions ──────────────────────────────────────

/** Get all retail (non-B2B) products */
export function getRetailProducts(): Product[] {
  return products.filter((p) => !p.isB2BOnly);
}

/** Get product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get products by category */
export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get all unique categories (retail only) */
export function getCategories(): { value: Product["category"]; label: string }[] {
  return [
    { value: "makhana", label: "Makhana" },
    { value: "cookies", label: "Cookies" },
    { value: "dry-fruits", label: "Dry Fruits" },
    { value: "super-grains", label: "Super Grains" },
  ];
}

/** Get featured products */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && !p.isB2BOnly);
}

/** Get default (first) variant for a product */
export function getDefaultVariant(product: Product) {
  return product.variants[0];
}

/** Format price in Indian Rupee format */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Calculate discount percentage */
export function getDiscountPercentage(mrp: number, price: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

// ── Coupon Codes ──────────────────────────────────────────

export const couponCodes: CouponCode[] = [
  {
    code: "KHIRRI10",
    type: "percentage",
    value: 10,
    minOrderValue: 299,
    maxDiscount: 150,
    description: "10% off on your first order (max ₹150 off)",
  },
  {
    code: "HEALTHY50",
    type: "flat",
    value: 50,
    minOrderValue: 499,
    description: "Flat ₹50 off on orders ≥ ₹499",
  },
  {
    code: "MAKHANA20",
    type: "percentage",
    value: 20,
    minOrderValue: 799,
    maxDiscount: 200,
    description: "20% off on orders ≥ ₹799 (max ₹200 off)",
  },
];

// ── Shipping Constants ──────────────────────────────────

export const SHIPPING = {
  FREE_DELIVERY_THRESHOLD: 499,
  FLAT_DELIVERY_CHARGE: 49,
  COD_SURCHARGE: 50,
  PREPAID_DISCOUNT: 30,
  ESTIMATED_DELIVERY_DAYS: { min: 5, max: 7 },
} as const;

// ── Indian States List ──────────────────────────────────

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry", "Jammu and Kashmir", "Ladakh",
] as const;
