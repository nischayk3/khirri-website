import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import ProductDetail from "./ProductDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products
    .filter((p) => !p.isB2BOnly)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Buy Online`,
    description: product.metaDescription || product.description,
    alternates: {
      canonical: `https://khirri.com/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — Buy Online | Khirri`,
      description: product.metaDescription || product.tagline,
      images: [{ url: product.image, width: 800, height: 800, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.isB2BOnly) notFound();

  return <ProductDetail product={product} />;
}
