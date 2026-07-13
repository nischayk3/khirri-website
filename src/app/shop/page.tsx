import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop — Buy Makhana, Cookies & Dry Fruits Online",
  description:
    "Buy premium Raw Makhana, Makhana Cookies, Afghan Anjeer, Walnuts & Mixed Millets online. Lab-tested, FSSAI certified. Free delivery on orders ≥ ₹499. Shop now at Khirri.",
  alternates: {
    canonical: "https://khirri.com/shop",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
