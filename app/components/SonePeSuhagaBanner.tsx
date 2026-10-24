"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { ArrowRight, Check, X } from "lucide-react";
import { MotionFadeIn } from "./ui/AnimatedText";

export default function SonePeSuhagaBanner() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showroom, setShowroom] = useState("Bhubaneswar Master Canteen Flagship");
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useStore();

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please provide your name and phone number.");
      return;
    }
    setIsSuccess(true);
    showToast("Thank you! Our Sone Pe Suhaga scheme advisor will connect with you.");
  };

  return (
    <>
      {/* =========================================================================
          SONE PE SUHAGA BANNER (Exact Lalchnd Visual Style with #021C4C background)
         ========================================================================= */}
      <section className="relative w-full bg-[#093B2A] overflow-hidden py-14 sm:py-20 my-0 border-y border-[#062A1E]">
        {/* Left Gold Jewellery Velvet Podium Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.85, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-0 top-0 bottom-0 w-1/4 lg:w-1/3 hidden md:block pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
            alt="Gold Necklace and Jhumkas"
            className="w-full h-full object-cover object-left mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#093B2A]/70 to-[#093B2A]" />
          <div className="absolute inset-0 bg-[#093B2A]/40 mix-blend-multiply" />
        </motion.div>

        {/* Right Gold Jewellery Velvet Podium Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.85, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute right-0 top-0 bottom-0 w-1/4 lg:w-1/3 hidden md:block pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1611591475879-11536b135154?auto=format&fit=crop&w=800&q=85"
            alt="Gold Choker and Bangles"
            className="w-full h-full object-cover object-right mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#093B2A]/70 to-[#093B2A]" />
          <div className="absolute inset-0 bg-[#093B2A]/40 mix-blend-multiply" />
        </motion.div>

        {/* Center Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          {/* Emblem: Exact Lalchnd Sone Pe Suhaga Banner Image with subtle float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <img
              src="https://lalchnd.com/images/lalchnd/sone-pe-suhag/sone-pe-suhaga-img.webp"
              alt="Sone Pe Suhaga"
              className="h-12 sm:h-16 w-auto object-contain mx-auto mb-2 drop-shadow-lg"
            />
          </motion.div>

          {/* Slogan: Plan Your Jewellery Purchase With Our Monthly Scheme */}
          <MotionFadeIn delay={0.15} className="space-y-1">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal">
              <span>Plan Your </span>
              <span className="font-script text-[#E2A62C] text-3xl sm:text-5xl lg:text-6xl font-normal inline-block mx-1">
                Jewellery
              </span>
              <span> Purchase</span>
            </h3>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal">
              <span>With Our </span>
              <span className="font-script text-[#E2A62C] text-3xl sm:text-5xl lg:text-6xl font-normal inline-block mx-1">
                Monthly Scheme
              </span>
            </h3>
          </MotionFadeIn>

          {/* Outline Action Button */}
          <MotionFadeIn delay={0.25} className="pt-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#093B2A" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2.5 px-8 py-3 rounded-none border border-white/90 text-white transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.22em] group shadow-lg"
            >
              <span>FOR MORE INFORMATION</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </motion.button>
          </MotionFadeIn>
        </div>
      </section>

      {/* MODAL: SONE PE SUHAGA INFORMATION & ENROLLMENT */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white text-stone-900 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 my-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#093B2A]">
                  Sone Pe Suhaga • Monthly Gold Scheme
                </h4>
                <p className="text-xs text-[#8F6D2C]">
                  Pay 11 Months • 12th Month Bonus Paid By Yashraj Jewellers
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsSuccess(false);
                }}
                className="p-1 rounded-full text-stone-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleEnroll} className="space-y-3.5 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1 text-stone-700">
                  <p className="font-semibold text-stone-900">Key Benefits:</p>
                  <ul className="space-y-1 list-disc list-inside text-[11px] text-stone-600">
                    <li>100% 12th month contribution credited to your account</li>
                    <li>Guaranteed gold rate lock against inflation</li>
                    <li>Zero or 50% flat discount on making charges during redemption</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Nearest Showroom
                  </label>
                  <select
                    value={showroom}
                    onChange={(e) => setShowroom(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                  >
                    <option value="Bhubaneswar Master Canteen Flagship">
                      Bhubaneswar (Master Canteen)
                    </option>
                    <option value="Bhubaneswar Raghunathpur">
                      Bhubaneswar (Raghunathpur)
                    </option>
                    <option value="Cuttack CDA Sector 9">
                      Cuttack (CDA Sector 9)
                    </option>
                    <option value="Cuttack Cantonment Road">
                      Cuttack (Cantonment Road)
                    </option>
                    <option value="Brahmapur Royal Showroom">
                      Brahmapur (Giri Market)
                    </option>
                    <option value="New Delhi Lajpat Boutique">
                      New Delhi (Lajpat Nagar)
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#093B2A] text-white hover:bg-[#0E543C] font-bold uppercase tracking-wider text-xs transition mt-2 flex items-center justify-center space-x-2"
                >
                  <span>Request Scheme Brochure & Callback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-serif font-bold text-lg text-stone-900">
                  Enquiry Registered, {name}!
                </h5>
                <p className="text-xs text-stone-600">
                  Our Sone Pe Suhaga gold plan specialist from {showroom} will reach out to you at {phone} with full scheme terms, passbook details, and bonus month structure.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-[#093B2A] text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
