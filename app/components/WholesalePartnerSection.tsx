"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import {
  Building2,
  TrendingUp,
  Gem,
  ShieldCheck,
  Truck,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AnimatedText, MotionFadeIn, MotionStagger, MotionStaggerItem } from "./ui/AnimatedText";

export default function WholesalePartnerSection() {
  const { setIsAppointmentOpen } = useStore();

  const handleWhatsAppB2B = () => {
    const text = encodeURIComponent(
      "Namaste Yashraj Jewellery! I am a jewellery retailer/reseller and would like to enquire about your wholesale collections, wholesale pricing, and catalogue for my business."
    );
    window.open(`https://wa.me/918917652306?text=${text}`, "_blank");
  };

  const ADVANTAGES = [
    {
      icon: TrendingUp,
      title: "Competitive Wholesale Pricing",
      desc: "Direct-from-manufacturer wholesale rates with transparent karat assaying and minimal making charges to maximize your retail margins.",
      tag: "Higher Retailer Margins",
    },
    {
      icon: Gem,
      title: "Extensive Ready Catalogue",
      desc: "Instant access to thousands of ready-to-ship designs across antique gold, temple polki, lightweight diamond solitaires, and 925 silver.",
      tag: "10,000+ Ready Designs",
    },
    {
      icon: ShieldCheck,
      title: "100% Certified Quality",
      desc: "Every gram of gold is BIS 916 hallmarked, natural diamonds are IGI/SGL certified, and silver is stamped 925 sterling purity.",
      tag: "BIS 916 & IGI Certified",
    },
    {
      icon: Truck,
      title: "Insured Pan-India Transit",
      desc: "Fully insured transit door-delivery directly to your showroom or business premises with expedited secure bullion logistics.",
      tag: "Safe & Prompt Logistics",
    },
  ];

  return (
    <section id="wholesale-section" className="py-20 lg:py-28 bg-[#FAF8F5] border-y border-[#E8DFC9] scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <MotionFadeIn delay={0.1}>
            <div className="inline-flex items-center space-x-2 bg-[#FAF3E0] border border-[#E0D5BE] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#8F6D2C] mb-4 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Premium Jewellery Wholesale</span>
            </div>
          </MotionFadeIn>

          <AnimatedText
            text="Partner With Yashraj Jewellery"
            el="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#093B2A] tracking-tight leading-tight justify-center"
          />

          <MotionFadeIn delay={0.25}>
            <p className="text-sm sm:text-base text-[#4A5568] mt-4 leading-relaxed max-w-3xl mx-auto font-sans">
              Yashraj Jewellery is a premium jewellery wholesale business offering a wide range of gold, diamond, silver, bridal, and traditional jewellery collections for retailers, resellers, and jewellery businesses. We focus on quality, elegant designs, competitive wholesale pricing, and trusted business partnerships. Our goal is to help jewellery retailers grow their businesses with beautiful collections and reliable service.
            </p>
          </MotionFadeIn>
        </div>

        {/* 4 Wholesale Core Advantages (Staggered Cards) */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14" stagger={0.12}>
          {ADVANTAGES.map((card, idx) => {
            const Icon = card.icon;
            return (
              <MotionStaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white p-7 rounded-2xl border border-[#E8DFC9] hover:border-[#C5A059] transition-colors hover:shadow-xl group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#093B2A] mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5A6E82] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-stone-100 flex items-center text-[11px] text-[#8F6D2C] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                    <span>{card.tag}</span>
                  </div>
                </motion.div>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>

        {/* Call to Action Banner for Retailers */}
        <MotionFadeIn delay={0.2}>
          <div className="bg-gradient-to-r from-[#093B2A] via-[#0E543C] to-[#093B2A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-semibold text-[#DFBA73] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Over 500+ Retail Partners Across India</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Grow Your Jewellery Business With Yashraj Wholesale
                </h3>
                <p className="text-emerald-100/90 text-xs sm:text-sm mt-3 leading-relaxed">
                  Access exclusive wholesale catalogues, bulk booking discounts, and customized manufacturing services crafted to elevate your store&apos;s collections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppB2B}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-900 font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-lg transition-transform flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Request Wholesale Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAppointmentOpen(true)}
                  className="px-7 py-3.5 rounded-full border border-[#DFBA73]/60 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#DFBA73]" />
                  <span>Talk to Wholesale Desk</span>
                </motion.button>
              </div>
            </div>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
