"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { LIVE_RATES } from "../data/products";
import { Coins, Gift, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function SwarnaSanchayScheme() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrolledName, setEnrolledName] = useState("");
  const [enrolledPhone, setEnrolledPhone] = useState("");
  const [enrolledStore, setEnrolledStore] = useState("Bhubaneswar Master Canteen");
  const [isSuccess, setIsSuccess] = useState(false);

  const { showToast } = useStore();

  const userContribution = monthlyAmount * 11;
  const yashrajBonus = monthlyAmount; // 100% of 12th month
  const totalMaturity = userContribution + yashrajBonus;
  const approxGoldGrams = (totalMaturity / LIVE_RATES.gold22k).toFixed(2);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrolledName || !enrolledPhone) {
      showToast("Please provide your name and mobile number.");
      return;
    }
    setIsSuccess(true);
    showToast("Enrollment successful! Our gold scheme manager will contact you.");
  };

  return (
    <section id="scheme-section" className="py-16 bg-[#181109] text-white relative overflow-hidden scroll-mt-20">
      {/* Background radial gold glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Scheme Information & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#2D200E] border border-[#C5A059]/40 px-3.5 py-1 rounded-full text-xs text-[#F5E8CB]">
              <Coins className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span className="font-semibold uppercase tracking-wider">
                Swarna Sanchay • Sone Pe Suhaga
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight">
              Invest in Gold Every Month & Get the 12th Month Free
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Plan ahead for weddings, anniversaries, or secure your future with Odisha&apos;s most rewarding gold savings plan. Pay 11 equal installments, and Yashraj Jewellers contributes the entire 12th month installment for you!
            </p>

            {/* Scheme Highlights Checklist */}
            <div className="space-y-3 pt-2 text-xs text-stone-200">
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#DFBA73] flex items-center justify-center shrink-0 border border-[#C5A059]/50">
                  <Check className="w-3 h-3" />
                </span>
                <span>
                  <strong>100% Yashraj Bonus:</strong> We pay the complete 12th month installment.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#DFBA73] flex items-center justify-center shrink-0 border border-[#C5A059]/50">
                  <Check className="w-3 h-3" />
                </span>
                <span>
                  <strong>Flat 50% Off Making Charges:</strong> Exclusive rebate on redemption.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#DFBA73] flex items-center justify-center shrink-0 border border-[#C5A059]/50">
                  <Check className="w-3 h-3" />
                </span>
                <span>
                  <strong>Online & In-Store Payments:</strong> Auto-debit, UPI, or cash at any showroom.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#C5A059]/25 transition flex items-center space-x-2"
              >
                <span>Enroll Online In 2 Minutes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Calculator Card */}
          <div className="lg:col-span-6 bg-[#251A0E]/90 border border-[#C5A059]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20">
              <h3 className="font-serif font-bold text-xl text-[#FAF8F5]">
                Gold Scheme Calculator
              </h3>
              <span className="text-xs text-[#DFBA73] font-semibold bg-[#362512] px-3 py-1 rounded-full border border-[#C5A059]/30">
                11 + 1 Scheme
              </span>
            </div>

            {/* Monthly Installment Selector */}
            <div className="space-y-3">
              <label className="flex justify-between text-xs text-stone-300 font-semibold">
                <span>Select Monthly Investment:</span>
                <span className="text-[#DFBA73] font-mono text-sm">
                  ₹{monthlyAmount.toLocaleString("en-IN")} / month
                </span>
              </label>

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[2000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setMonthlyAmount(amt)}
                    className={`py-2 rounded-lg font-mono font-bold transition ${
                      monthlyAmount === amt
                        ? "bg-[#C5A059] text-stone-900 shadow-sm"
                        : "bg-[#181109] text-stone-300 border border-[#C5A059]/30 hover:border-[#C5A059]"
                    }`}
                  >
                    ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full accent-[#DFBA73] cursor-pointer"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="p-5 bg-[#170F07] rounded-2xl border border-[#C5A059]/30 space-y-3 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Your Contribution (11 Months):</span>
                <span className="font-mono font-semibold">
                  ₹{userContribution.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[#DFBA73] font-semibold">
                <span className="flex items-center">
                  <Gift className="w-3.5 h-3.5 mr-1" />
                  Yashraj Jewellers Bonus (12th Month):
                </span>
                <span className="font-mono">+₹{yashrajBonus.toLocaleString("en-IN")}</span>
              </div>
              <div className="pt-2 border-t border-[#C5A059]/30 flex justify-between items-baseline">
                <div>
                  <span className="text-stone-300 font-bold block text-sm">
                    Total Maturity Jewellery Value:
                  </span>
                  <span className="text-[11px] text-[#DFBA73]">
                    Approx. {approxGoldGrams} grams of 22K hallmarked gold
                  </span>
                </div>
                <span className="text-2xl font-bold font-mono text-[#F5E8CB]">
                  ₹{totalMaturity.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowEnrollModal(true)}
              className="w-full py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs uppercase tracking-wider transition"
            >
              Start This Plan With ₹{monthlyAmount.toLocaleString("en-IN")}
            </button>
          </div>
        </div>
      </div>

      {/* ENROLLMENT MODAL */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-stone-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#DEC9A2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
              <h4 className="font-serif font-bold text-lg">
                Enroll in Swarna Sanchay Scheme
              </h4>
              <button
                onClick={() => {
                  setShowEnrollModal(false);
                  setIsSuccess(false);
                }}
                className="text-stone-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleEnrollSubmit} className="space-y-3 text-xs">
                <p className="text-stone-600">
                  Selected Installment: <strong>₹{monthlyAmount.toLocaleString("en-IN")} / month</strong>
                </p>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={enrolledName}
                    onChange={(e) => setEnrolledName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={enrolledPhone}
                    onChange={(e) => setEnrolledPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Preferred Showroom</label>
                  <select
                    value={enrolledStore}
                    onChange={(e) => setEnrolledStore(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-900"
                  >
                    <option value="Bhubaneswar Master Canteen">Bhubaneswar (Master Canteen)</option>
                    <option value="Bhubaneswar Raghunathpur">Bhubaneswar (Raghunathpur)</option>
                    <option value="Cuttack CDA">Cuttack (CDA Sector 9)</option>
                    <option value="Cuttack Cantonment">Cuttack (Cantonment Road)</option>
                    <option value="Brahmapur">Brahmapur (Giri Market)</option>
                    <option value="New Delhi">New Delhi (Lajpat Nagar)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8F6D2C] text-white font-bold uppercase tracking-wider hover:bg-[#72551F] transition mt-2"
                >
                  Submit & Receive Scheme Kit
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-serif font-bold text-lg text-stone-900">
                  Congratulations, {enrolledName}!
                </h5>
                <p className="text-xs text-stone-600">
                  Your Swarna Sanchay gold scheme application for ₹{monthlyAmount.toLocaleString("en-IN")}/mo is registered with {enrolledStore}. Our scheme manager will call you at {enrolledPhone} to assist with your first payment and scheme passbook.
                </p>
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="px-6 py-2 bg-[#8F6D2C] text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
