"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Receipt,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Lock,
  Search,
  Scale,
  ArrowUpRight,
  Gem,
} from "lucide-react";
import { AnimatedText, MotionFadeIn, MotionStagger, MotionStaggerItem } from "./ui/AnimatedText";

export default function PromisesSection() {
  return (
    <section id="promises-section" className="py-20 lg:py-28 bg-white border-b border-stone-100 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <AnimatedText
            text="The Yashraj Promises"
            el="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#093B2A] tracking-tight justify-center"
          />

          <MotionFadeIn delay={0.2}>
            <p className="text-xs sm:text-sm text-[#5A6E82] mt-3.5 leading-relaxed max-w-2xl mx-auto">
              Pure Quality. Perfect Craftsmanship. Pleased Customers. Built on over seven decades of trust, we stand steadfast by four uncompromising pillars of luxury jewellery shopping.
            </p>
          </MotionFadeIn>
        </div>

        {/* =========================================================================
            BENTO GRID LAYOUT
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* -------------------------------------------------------------
              BENTO 1: HERO TILE (Span 7 cols) - ASSURED PURITY & BIS HUID
             ------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-7 bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 border border-[#E8DFC9] hover:border-[#D4AF37] transition-colors relative overflow-hidden group flex flex-col justify-between shadow-xs hover:shadow-xl"
          >
            {/* Background luxury subtle radial glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#DFBA73]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#093B2A] text-[#E2A62C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8F6D2C] bg-white border border-[#E0D5BE] px-3.5 py-1.5 rounded-full shadow-2xs">
                  Government Certified
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#093B2A] mb-2.5">
                100% BIS Hallmarked Purity
              </h3>

              <p className="text-xs sm:text-sm text-[#5A6E82] leading-relaxed max-w-xl mb-6">
                Every gold jewel is engraved with the government 6-digit alphanumeric Laser HUID (Hallmark Unique Identification). Each diamond is independently verified with physical certification cards from IGI and SGL laboratories.
              </p>

              {/* Interactive Laser HUID Preview Pill Box */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFC9] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                  <span className="font-semibold text-stone-700 flex items-center space-x-1.5">
                    <Search className="w-3.5 h-3.5 text-[#E2A62C]" />
                    <span>Live BIS Verification Protocol</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    ✓ Verified Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#FAF8F3] p-2.5 rounded-xl border border-stone-100">
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Purity</span>
                    <span className="text-xs sm:text-sm font-bold text-[#093B2A]">22KT 916</span>
                  </div>
                  <div className="bg-[#FAF8F3] p-2.5 rounded-xl border border-stone-100">
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Laser HUID</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#8F6D2C]">#YJ91678</span>
                  </div>
                  <div className="bg-[#FAF8F3] p-2.5 rounded-xl border border-stone-100">
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Diamond Lab</span>
                    <span className="text-xs sm:text-sm font-bold text-[#093B2A]">IGI / SGL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFC9]/70 flex items-center justify-between text-xs font-semibold text-[#8F6D2C]">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-[#E2A62C]" />
                Verifiable on BIS Care Official App
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#8F6D2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* -------------------------------------------------------------
              BENTO 2: TRANSPARENT ITEMIZED BILLING (Span 5 cols)
             ------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/90 hover:border-[#D4AF37] transition-colors flex flex-col justify-between group shadow-xs hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center shadow-2xs group-hover:bg-[#8F6D2C] group-hover:text-white transition-colors">
                  <Receipt className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F6D2C] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#E8DCBE]">
                  Zero Hidden Costs
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#093B2A] mb-2">
                100% Transparent Invoicing
              </h3>

              <p className="text-xs sm:text-sm text-[#5A6E82] leading-relaxed mb-5">
                Exact mathematical breakdown with every invoice. We calculate every component openly in front of you.
              </p>

              {/* Sample Mini Receipt Breakdown */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/70 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Net Gold Weight:</span>
                  <span className="font-semibold text-stone-800">Assayed on Karatmeter</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Gold Rate Applied:</span>
                  <span className="font-semibold text-stone-800">Today&apos;s Live Bullion Rate</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Making Charges:</span>
                  <span className="font-semibold text-emerald-700 font-mono">Itemized (No mysteries)</span>
                </div>
                <div className="flex justify-between text-stone-900 font-bold pt-2 border-t border-stone-200">
                  <span>Final Transparent Value</span>
                  <span className="text-[#8F6D2C]">100% Tax Compliant</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-100 flex items-center text-xs font-semibold text-[#8F6D2C]">
              <CheckCircle2 className="w-4 h-4 mr-2 text-[#E2A62C]" />
              <span>Full GST Invoice with HSN code issued</span>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------
              BENTO 3: LIFETIME BUYBACK & FAIR EXCHANGE (Span 4 cols)
             ------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 hover:border-[#D4AF37] transition-colors flex flex-col justify-between group shadow-xs hover:shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mb-5 group-hover:bg-[#8F6D2C] group-hover:text-white transition-colors">
                <RefreshCw className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6D2C] block mb-1">
                Value Assurance
              </span>

              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#093B2A] mb-2">
                Lifetime Exchange & Buyback
              </h4>

              <p className="text-xs text-[#5A6E82] leading-relaxed">
                Seamlessly upgrade or exchange your jewellery across any Yashraj showroom with guaranteed transparent karatmeter testing and fair valuation.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-stone-100 flex items-center text-xs font-semibold text-[#8F6D2C]">
              <Scale className="w-4 h-4 mr-2 text-[#E2A62C]" />
              <span>Digital Karat Assay in front of you</span>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------
              BENTO 4: ROYAL BESPOKE KARIGARI (Span 4 cols)
             ------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 hover:border-[#D4AF37] transition-colors flex flex-col justify-between group shadow-xs hover:shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mb-5 group-hover:bg-[#8F6D2C] group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6D2C] block mb-1">
                Custom Craftsmanship
              </span>

              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#093B2A] mb-2">
                Bespoke Royal Karigari
              </h4>

              <p className="text-xs text-[#5A6E82] leading-relaxed">
                Bring your dream bridal heirloom to life with generational master karigars. From hand-sketches to 3D CAD modeling and stone-setting.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-stone-100 flex items-center text-xs font-semibold text-[#8F6D2C]">
              <Gem className="w-4 h-4 mr-2 text-[#E2A62C]" />
              <span>Personal jewellery design consultation</span>
            </div>
          </motion.div>

          {/* -------------------------------------------------------------
              BENTO 5: FULLY INSURED TRANSIT & VAULT SAFETY (Span 4 cols)
             ------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 hover:border-[#D4AF37] transition-colors flex flex-col justify-between group shadow-xs hover:shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mb-5 group-hover:bg-[#8F6D2C] group-hover:text-white transition-colors">
                <Lock className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6D2C] block mb-1">
                Security & Trust
              </span>

              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#093B2A] mb-2">
                100% Insured Delivery
              </h4>

              <p className="text-xs text-[#5A6E82] leading-relaxed">
                Every delivery across India is dispatched in tamper-evident sealed security vaults with comprehensive transit insurance until handed to you.
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-stone-100 flex items-center text-xs font-semibold text-[#8F6D2C]">
              <CheckCircle2 className="w-4 h-4 mr-2 text-[#E2A62C]" />
              <span>Zero risk from showroom to doorstep</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
