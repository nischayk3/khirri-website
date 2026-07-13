import type { Metadata } from "next";
import MyOrdersContent from "./MyOrdersContent";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your past orders and track shipments from Khirri.",
};

export default function MyOrdersPage() {
  return (
    <>
      <Navbar />
      <MyOrdersContent />
    </>
  );
}
