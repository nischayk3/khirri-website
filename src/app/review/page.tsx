import type { Metadata } from "next";
import ReviewContent from "./ReviewContent";

export const metadata: Metadata = {
  title: "Review Khirri | Share Your Experience",
  description: "Rate and review your experience with Khirri Phool Makhana. Your feedback helps us serve you better!",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return <ReviewContent />;
}
