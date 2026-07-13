import type { Metadata } from "next";
import SuccessContent from "./SuccessContent";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Order Successful - Khirri",
  description: "Thank you for your order from Khirri.",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <SuccessContent />
    </>
  );
}
