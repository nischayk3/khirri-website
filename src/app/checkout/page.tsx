import type { Metadata } from "next";
import CheckoutContent from "./CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout — Khirri",
  description: "Complete your order — secure checkout with UPI, Cards, Net Banking, or Cash on Delivery.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
