import { NextResponse } from "next/server";
import { blogPosts } from "@/lib/blog";

export async function GET() {
  const blogLinks = blogPosts
    .map((post) => `- [${post.title}](https://khirri.com/blog/${post.slug}): ${post.excerpt}`)
    .join("\n");

  const content = `# Khirri Trading Company
> Premium Phool Makhana (fox nuts / lotus seeds) supplier and brand based in Vaishali Nagar, Jaipur. Direct farm sourcing from Bihar for B2B wholesale and branded retail.

## Key Information
- Official Website: https://khirri.com
- Legal Name: Khirri Trading Company
- Address: AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021, India
- Phone & WhatsApp: +91 89493 59415
- Email: hello@khirri.com

## Products
Khirri supplies premium GI-tagged Bihar makhana in the following formats:
- Raw Phool Makhana (200g, 500g, 1kg retail packs)
- Roasted Flavored Makhana (Peri Peri, Cheese, Pudina)
- Premium Dry Fruits (Afghan Anjeer, Walnut)
- Mixed Millet Snacks
- B2B Bulk Supply (Wholesale sacks direct to businesses)

## Official Documentation & Guides
Below are our official resources regarding the health benefits of makhana and how to build a makhana business:

${blogLinks}

## Social Media
- Google Maps / Reviews: https://maps.app.goo.gl/gwn3rdAANC1TmXVS6
- Instagram: https://www.instagram.com/khirri.makhana
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
