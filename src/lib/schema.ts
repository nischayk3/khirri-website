/* ============================================================
   KHIRRI — Structured Data (JSON-LD) Generators
   ============================================================ */

import { Product, ProductVariant } from "./types";

/** Product schema for retail product pages */
export function productSchema(product: Product, variant: ProductVariant) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription || product.description,
    image: product.gallery?.length
      ? product.gallery.map((img) => `https://khirri.com${img}`)
      : [`https://khirri.com${product.image}`],
    brand: { "@type": "Brand", name: "Khirri" },
    offers: {
      "@type": "Offer",
      price: variant.price,
      priceCurrency: "INR",
      availability: variant.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://khirri.com/product/${product.slug}`,
      priceValidUntil: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
    },
    ...(product.nutrition
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            calories: product.nutrition.find((n) =>
              n.label.toLowerCase().includes("energy")
            )?.value,
            proteinContent: product.nutrition.find((n) =>
              n.label.toLowerCase().includes("protein")
            )?.value,
            fiberContent: product.nutrition.find((n) =>
              n.label.toLowerCase().includes("fiber")
            )?.value,
          },
        }
      : {}),
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://khirri.com${item.url}`,
    })),
  };
}

/** FAQPage schema */
export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };
}

/** Article schema for blog posts */
export function articleSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    url: `https://khirri.com${params.url}`,
    image: params.image
      ? `https://khirri.com${params.image}`
      : "https://khirri.com/og-image.jpg",
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      "@type": "Person",
      name: params.author,
    },
    articleSection: params.category,
    publisher: {
      "@type": "Organization",
      name: "Khirri Trading Company",
      url: "https://khirri.com",
    },
  };
}

/** LocalBusiness schema for city-specific pages */
export function localBusinessSchema(params: {
  city: string;
  state: string;
  description: string;
  url: string;
  phone: string;
  address?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["FoodStore", "WholesaleStore"],
    name: `Khirri Makhana — ${params.city}`,
    description: params.description,
    url: `https://khirri.com${params.url}`,
    telephone: params.phone,
    areaServed: ["Jaipur", "Bangalore", "India"],
    ...(params.address
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: params.city,
            addressRegion: params.state,
            streetAddress: params.address,
            addressCountry: "IN",
          },
        }
      : {}),
  };
}

/** Aggregate Rating schema for testimonials */
export function aggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  itemName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
