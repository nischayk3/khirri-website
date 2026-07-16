import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = blogPosts.map((post) => ({
    url: `https://khirri.com/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productUrls = products
    .filter((p) => !p.isB2BOnly)
    .map((product) => ({
      url: `https://khirri.com/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: "https://khirri.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://khirri.com/shop",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://khirri.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://khirri.com/locations/jaipur",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://khirri.com/locations/bangalore",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // --- B2B Wholesale Landing Pages ---
    {
      url: "https://khirri.com/bulk-makhana-supplier-jaipur",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://khirri.com/wholesale-makhana-bangalore",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://khirri.com/makhana-cookies-wholesale",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://khirri.com/jaipur-makhana-price-guide",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // --- Legal & B2B ---
    {
      url: "https://khirri.com/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://khirri.com/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://khirri.com/sample-request",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productUrls,
    ...blogUrls,
  ];
}
