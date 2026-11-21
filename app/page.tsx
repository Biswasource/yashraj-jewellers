import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LuxuryEditorialShowcase from "./components/LuxuryEditorialShowcase";
import SonePeSuhagaBanner from "./components/SonePeSuhagaBanner";
import WholesalePartnerSection from "./components/WholesalePartnerSection";
import PromisesSection from "./components/PromisesSection";
import CustomerTestimonials from "./components/CustomerTestimonials";
import FollowUsSection from "./components/FollowUsSection";
import Footer from "./components/Footer";
import InstantCashGoldModal from "./components/InstantCashGoldModal";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#DFBA73]/30">
      {/* Attractive 5-Minute Instant Cash For Gold Offer Popup */}
      <InstantCashGoldModal />

      {/* 1. Regal Header & Navigation */}
      <Navbar />

      {/* 2. Hero Carousel & Quick Category Navigation */}
      <HeroSection />

      {/* 3. Luxury Editorial Showcase: Gold & Diamond Collections */}
      <LuxuryEditorialShowcase />

      {/* 4. Sone Pe Suhaga Monthly Gold Scheme Wide Banner */}
      <SonePeSuhagaBanner />

      {/* 5. Premium Jewellery Wholesale Business & Retailer Partnership */}
      <WholesalePartnerSection />

      {/* 6. The Yashraj Promises (Hallmark, Transparent Billing, Buyback) */}
      <PromisesSection />

      {/* 7. Verified Customer Reviews & Stories */}
      <CustomerTestimonials />

      {/* 8. Follow Us - Video Showcase */}
      <FollowUsSection />

      {/* 9. Comprehensive Luxury Footer */}
      <Footer />
    </main>
  );
}
