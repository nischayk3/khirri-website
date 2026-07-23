import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog";
import { products } from "@/lib/products";

export async function GET() {
  const productLines = products
    .filter((p) => !p.isB2BOnly)
    .map((p) => `- [${p.name}](https://khirri.com/product/${p.slug}): ${p.tagline} — ₹${p.variants[0]?.price || "Enquire"}`)
    .join("\n");

  const b2bPages = [
    { title: "Bulk Makhana Supplier Jaipur", url: "/bulk-makhana-supplier-jaipur" },
    { title: "Wholesale Makhana Bangalore", url: "/wholesale-makhana-bangalore" },
    { title: "Makhana Cookies Wholesale", url: "/makhana-cookies-wholesale" },
    { title: "Private Label Makhana", url: "/private-label-makhana" },
    { title: "Makhana Size Guide", url: "/makhana-size-guide" },
    { title: "Makhana Export Supplier", url: "/makhana-export-supplier" },
    { title: "Wholesale Makhana Pricing", url: "/wholesale-makhana-pricing" },
    { title: "Sample Request", url: "/sample-request" },
  ].map((p) => `- [${p.title}](https://khirri.com${p.url})`).join("\n");

  const locationPages = [
    "Jaipur", "Bangalore", "Delhi", "Mumbai", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad",
  ].map((city) => `- [Makhana in ${city}](https://khirri.com/locations/${city.toLowerCase()})`).join("\n");

  const healthPosts = blogPosts
    .filter((p) => p.category === "Health & Nutrition")
    .map((p) => `- [${p.title}](https://khirri.com/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const b2bPosts = blogPosts
    .filter((p) => p.category === "B2B Insights")
    .map((p) => `- [${p.title}](https://khirri.com/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const recipePosts = blogPosts
    .filter((p) => p.category === "Recipes")
    .map((p) => `- [${p.title}](https://khirri.com/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const content = `# Khirri Trading Company
> Premium Phool Makhana (fox nuts / lotus seeds) supplier and brand based in Vaishali Nagar, Jaipur. Direct farm sourcing from Bihar for B2B wholesale and branded retail.

## Key Information
- Official Website: https://khirri.com
- Legal Name: Khirri Trading Company
- Address: AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021, India
- Phone & WhatsApp: +91 89493 59415
- Email: hello@khirri.com
- Google Maps: https://maps.google.com/maps?cid=17751742516743452233
- Instagram: https://www.instagram.com/khirri.makhana

## Products
${productLines}

## B2B / Wholesale Services
${b2bPages}

## City Pages — Makhana Supply Locations
${locationPages}

## Health & Nutrition Content
${healthPosts || "- No posts available"}

## B2B Insights
${b2bPosts || "- No posts available"}

## Recipes
${recipePosts || "- No posts available"}

## FAQ
- [Makhana FAQ — 50+ Questions Answered](https://khirri.com/faq)
- [Customer Reviews](https://khirri.com/reviews)
- [Shipping Policy](https://khirri.com/shipping-policy)

## Pricing & Products (Machine-Readable)
- [AI-Friendly Pricing Data](https://khirri.com/pricing.txt)

## Website Pages
- [About Us](https://khirri.com/about)
- [Contact Us](https://khirri.com/contact)
- [Shop All Products](https://khirri.com/shop)
- [Blog](https://khirri.com/blog)
- [Privacy Policy](https://khirri.com/privacy)
- [Terms of Use](https://khirri.com/terms)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
