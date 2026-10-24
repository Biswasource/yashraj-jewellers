"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function Footer() {
  const { setSelectedCategory, setSelectedMetal, scrollToProducts, showToast } = useStore();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes("@")) {
      setSubscribed(true);
      showToast("Thank you for subscribing to Yashraj VIP Gold Rate updates!");
    } else {
      showToast("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#093B2A] via-[#062F21] to-[#042419] text-[#E8F3EE] border-t border-[#DFBA73]/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 1. NEWSLETTER SUBSCRIPTION FOR GOLD RATES */}
        <div className="pb-12 border-b border-[#124831] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Stay Connected for Daily Gold Rates & Private Previews
            </h4>
            <p className="text-xs text-[#C5DDD2] mt-1">
              Receive morning bullion rate SMS alerts, festive offers, and invitations to our exclusive bridal exhibitions.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md space-x-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#05291C] border border-[#DFBA73]/40 rounded-xl text-xs text-white placeholder-emerald-200/40 focus:outline-hidden focus:border-[#DFBA73]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-lg transition shrink-0"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-xs font-semibold text-[#DFBA73] bg-[#05291C] px-4 py-2.5 rounded-xl border border-[#DFBA73]/40">
              ✓ Subscribed! You will receive daily bullion alerts.
            </p>
          )}
        </div>

        {/* 2. FOUR-COLUMN DIRECTORY */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#DFBA73]/60 shadow-lg shrink-0 bg-[#072016]">
                <img
                  src="/logo.png"
                  alt="Yashraj Jewellers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl tracking-widest uppercase text-white">
                  Yashraj Jewellers
                </h3>
                <p className="text-[10px] text-[#DFBA73] tracking-[0.25em] uppercase font-medium mt-0.5">
                  Premium Jewellery Wholesale • Est. 1982
                </p>
              </div>
            </div>
            <p className="text-[#E8F3EE]/85 text-xs leading-relaxed max-w-sm">
              Yashraj Jewellery is a premium jewellery wholesale business offering a wide range of gold, diamond, silver, bridal, and traditional jewellery collections for retailers, resellers, and jewellery businesses. We focus on quality, elegant designs, competitive wholesale pricing, and trusted business partnerships.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-[#C5DDD2] text-xs">
              <span>Bhubaneswar</span>
              <span>•</span>
              <span>Cuttack</span>
              <span>•</span>
              <span>Brahmapur</span>
              <span>•</span>
              <span>New Delhi</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-serif font-bold text-sm text-[#DFBA73] uppercase tracking-wider mb-4 border-b border-[#124831] pb-2">
              Jewellery Lines
            </h5>
            <ul className="space-y-2 text-[#E8F3EE]/80">
              <li>
                <button
                  onClick={() => {
                    setSelectedMetal("gold");
                    scrollToProducts();
                  }}
                  className="hover:text-white transition"
                >
                  22K / 24K Gold Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMetal("diamond");
                    scrollToProducts();
                  }}
                  className="hover:text-white transition"
                >
                  Certified Solitaire Diamonds
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMetal("silver");
                    scrollToProducts();
                  }}
                  className="hover:text-white transition"
                >
                  Odisha Tarakasi Silver Filigree
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("necklaces");
                    scrollToProducts();
                  }}
                  className="hover:text-white transition"
                >
                  Vivaha Antique Chokers & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("coins");
                    scrollToProducts();
                  }}
                  className="hover:text-white transition"
                >
                  Lakshmi 24K Pure Coins
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Schemes & Promises */}
          <div>
            <h5 className="font-serif font-bold text-sm text-[#DFBA73] uppercase tracking-wider mb-4 border-b border-[#124831] pb-2">
              Schemes & Services
            </h5>
            <ul className="space-y-2 text-[#E8F3EE]/80">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("follow-us-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition"
                >
                  Craftsmanship Films & Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("promises-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition"
                >
                  The Yashraj Promises
                </button>
              </li>
              <li>
                <a href="#rates" className="hover:text-white transition">
                  Daily Bullion Market Board
                </a>
              </li>
              <li>
                <span className="text-[#A3C4B7]">Corporate & Festive Gifting</span>
              </li>
              <li>
                <span className="text-[#A3C4B7]">Bridal Consultation by Appointment</span>
              </li>
            </ul>
          </div>

          {/* Contact Care */}
          <div>
            <h5 className="font-serif font-bold text-sm text-[#DFBA73] uppercase tracking-wider mb-4 border-b border-[#124831] pb-2">
              Visit Showroom
            </h5>
            <div className="space-y-2.5 text-[#E8F3EE]/85">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#DFBA73] mt-0.5 shrink-0" />
                <span>Station Square, Unit-3, Master Canteen, Bhubaneswar 751001</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span>0674 - 2534016 / 17 / 18</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span>contact@yashrajjewellers.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span>10:30 AM - 8:30 PM (All 7 Days)</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT & REPLACEMENT INSTRUCTION FOOTER */}
        <div className="pt-8 border-t border-[#124831] flex flex-col md:flex-row items-center justify-between text-[#A3C4B7] text-[11px] gap-4">
          <p>© 2026 Yashraj Jewellers. All Rights Reserved. Hallmarked & Certified by Govt of India BIS.</p>
          <div className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Billing</span>
            <span>•</span>
            <span>Exchange & Buyback Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
