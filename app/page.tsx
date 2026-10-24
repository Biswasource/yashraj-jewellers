import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LuxuryEditorialShowcase from "./components/LuxuryEditorialShowcase";
import SonePeSuhagaBanner from "./components/SonePeSuhagaBanner";
import SilverKidsShowcase from "./components/SilverKidsShowcase";
import WholesalePartnerSection from "./components/WholesalePartnerSection";
import PromisesSection from "./components/PromisesSection";
import CustomerTestimonials from "./components/CustomerTestimonials";
import FollowUsSection from "./components/FollowUsSection";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#DFBA73]/30">
      {/* 1. Regal Header & Navigation */}
      <Navbar />

      {/* 2. Hero Carousel & Quick Category Navigation */}
      <HeroSection />

      {/* 3. Luxury Editorial Showcase: Gold & Diamond Collections (Exact Lalchnd Style) */}
      <LuxuryEditorialShowcase />

      {/* 4. Sone Pe Suhaga Monthly Gold Scheme Wide Banner */}
      <SonePeSuhagaBanner />

      {/* 5. Editorial Showcase: Silver & Kids Collections (Exact Lalchnd Style) */}
      <SilverKidsShowcase />

      {/* 6. Premium Jewellery Wholesale Business & Retailer Partnership */}
      <WholesalePartnerSection />

      {/* 7. The Yashraj Promises (Hallmark, Transparent Billing, Buyback) */}
      <PromisesSection />

      {/* 9. Verified Customer Reviews & Stories */}
      <CustomerTestimonials />

      {/* 10. Follow Us - Unlimited YouTube & Social Video Showcase */}
      <FollowUsSection />

      {/* 11. Comprehensive Luxury Footer */}
      <Footer />
    </main>
  );
}
