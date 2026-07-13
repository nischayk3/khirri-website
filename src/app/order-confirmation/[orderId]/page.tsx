import type { Metadata } from "next";
import OrderConfirmationContent from "./OrderConfirmationContent";

export const metadata: Metadata = {
  title: "Order Confirmed — Khirri",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationContent />;
}
