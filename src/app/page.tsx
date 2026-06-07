import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Products from "./components/Products";
import WhyKhirri from "./components/WhyKhirri";
import SuperfoodStats from "./components/SuperfoodStats";
import NutritionBenefits from "./components/NutritionBenefits";
import Testimonials from "./components/Testimonials";
import BlogTeaser from "./components/BlogTeaser";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import WhatsAppFAB from "./components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Products />
        <WhyKhirri />
        <SuperfoodStats />
        <NutritionBenefits />
        <Testimonials />
        <BlogTeaser />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
