import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khirri.com"),
  title: {
    default: "Khirri | Premium Makhana Supplier — Jaipur, India | B2B & Retail",
    template: "%s | Khirri Phool Makhana",
  },
  description:
    "Khirri delivers hand-graded Phool Makhana (fox nuts / lotus seeds) sourced directly from Bihar farms. Trusted by businesses across India for bulk wholesale supply and premium retail packs. Based in Vaishali Nagar, Jaipur.",
  keywords: [
    "makhana supplier jaipur",
    "bulk makhana wholesale india",
    "phool makhana b2b",
    "fox nuts wholesale",
    "lotus seeds supplier rajasthan",
    "makhana brand india",
    "buy makhana in bulk",
    "raw makhana jaipur",
    "makhana vaishali nagar",
    "khirri makhana",
  ],
  authors: [{ name: "Khirri", url: "https://khirri.com" }],
  creator: "Khirri",
  publisher: "Khirri",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://khirri.com",
    siteName: "Khirri Phool Makhana",
    title: "Khirri | Premium Makhana Supplier — Jaipur, India",
    description:
      "Hand-graded Phool Makhana (fox nuts) sourced directly from Bihar farms. B2B bulk supply & branded retail packs. Based in Vaishali Nagar, Jaipur.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khirri Premium Makhana — Sourced from Bihar, Packed in Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khirri | Premium Makhana Supplier — Jaipur",
    description:
      "Hand-graded Phool Makhana sourced from Bihar. Bulk B2B supply & retail packs. Based in Jaipur, Rajasthan.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://khirri.com",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FoodStore", "WholesaleStore"],
      "@id": "https://khirri.com/#business",
      name: "Khirri phool makhana",
      description:
        "Premium Phool Makhana (fox nuts / lotus seeds) supplier and brand based in Vaishali Nagar, Jaipur. Direct farm sourcing from Bihar for B2B wholesale and branded retail.",
      url: "https://khirri.com",
      logo: "https://khirri.com/khirri-logo.png",
      image: "https://khirri.com/og-image.jpg",
      telephone: "+918949359415",
      address: {
        "@type": "PostalAddress",
        streetAddress: "AA-7, Nursery Cir, Acharya Vinoba Bhave Nagar, B Block, Vaishali Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302021",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.9124",
        longitude: "75.7873",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
      sameAs: [
        "https://maps.app.goo.gl/gwn3rdAANC1TmXVS6",
        "https://www.instagram.com/khirri.makhana",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://khirri.com/#org",
      name: "Khirri Trading Company",
      url: "https://khirri.com",
      foundingDate: "2024",
      areaServed: "IN",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="theme-color" content="#5c3a1e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
