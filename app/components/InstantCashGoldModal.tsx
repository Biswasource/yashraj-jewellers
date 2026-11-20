"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
  Gem,
  Award,
  CheckCircle2,
} from "lucide-react";
import { LIVE_RATES } from "../data/products";

export default function InstantCashGoldModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [goldWeight, setGoldWeight] = useState<number>(10);
  const [selectedPurity, setSelectedPurity] = useState<"22k" | "24k" | "18k">("22k");
  const [selectedMode, setSelectedMode] = useState<"cash" | "exchange">("cash");

  useEffect(() => {
    // Check if user already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem("yj_gold_cash_popup_dismissed");
      if (dismissed === "true") {
        return;
      }
    } catch {}

    // Open smoothly after 1.4 seconds on homepage load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("yj_gold_cash_popup_dismissed", "true");
    } catch {}
  };

  const currentRate =
    selectedPurity === "24k"
      ? LIVE_RATES.gold24k
      : selectedPurity === "22k"
      ? LIVE_RATES.gold22k
      : LIVE_RATES.gold18k;

  // If exchange, offer +3% bonus valuation!
  const bonusMultiplier = selectedMode === "exchange" ? 1.03 : 1.0;
  const estimatedPayout = Math.round(goldWeight * currentRate * bonusMultiplier);

  const whatsappMessage = encodeURIComponent(
    `Namaste Yashraj Jewellers!\n\nI saw your 5-Minute Gold Exchange offer on your website:\n- Purity: ${selectedPurity.toUpperCase()}\n- Weight: ~${goldWeight}g\n- Option: ${selectedMode === "cash" ? "Instant Cash / Bank Transfer in 5 Min" : "Exchange for New Jewellery (+3% Bonus Value)"}\n- Estimated Valuation: ₹${estimatedPayout.toLocaleString("en-IN")}\n\nPlease let me know your showroom location and timing for 100% Karatmeter purity test.\n\nThank you!`
  );

  return (
    <>
      {/* Floating Reopen Button if modal was closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-4 sm:left-6 z-40 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] px-4 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border border-white/40 cursor-pointer animate-bounce"
          style={{ animationDuration: "3s" }}
          title="Instant Cash for Old Gold in 5 Minutes"
        >
          <Zap className="w-4 h-4 fill-[#1A1208]" />
          <span className="font-sans font-extrabold">Instant Cash for Gold (5 Min)</span>
        </button>
      )}

      {/* Main Luxury Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg bg-gradient-to-b from-[#0B251B] via-[#071A12] to-[#040F0A] text-white rounded-3xl border-2 border-[#DFBA73]/60 shadow-[0_0_60px_rgba(223,186,115,0.35)] overflow-hidden my-auto max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Golden Flash Banner */}
            <div className="bg-gradient-to-r from-[#DFBA73] via-[#FFE3A3] to-[#C5A059] text-stone-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] py-2 px-4 text-center flex items-center justify-center space-x-2 shadow-inner">
              <Zap className="w-3.5 h-3.5 fill-stone-950" />
              <span>5-Minute Express Payout • Spot Cash / Bank IMPS</span>
              <span className="hidden sm:inline">• Highest Rate in Odisha</span>
            </div>

            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-3 relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close offer modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-[#DFBA73] uppercase tracking-[0.2em] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>Special Customer Offer</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFDF9] leading-tight">
                Exchange Old Gold for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE8B8] via-[#DFBA73] to-[#C5A059]">
                  Instant Cash
                </span>{" "}
                in 5 Minutes!
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1.5 leading-relaxed">
                Turn your old, broken, or unused gold jewellery into immediate spot cash or instant bank transfer at Odisha&apos;s highest bullion market rates.
              </p>
            </div>

            {/* Modal Body / Offer Options */}
            <div className="px-5 sm:px-6 pb-6 overflow-y-auto space-y-4">
              {/* Choice Tabs: Cash vs Exchange */}
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedMode("cash")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    selectedMode === "cash"
                      ? "bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 shadow-md"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant Spot Cash</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode("exchange")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    selectedMode === "exchange"
                      ? "bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 shadow-md"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exchange (+3% Bonus)</span>
                </button>
              </div>

              {/* Offer Highlight Box */}
              {selectedMode === "cash" ? (
                <div className="bg-[#051810] border border-[#C5A059]/40 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#DFBA73] font-semibold flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>5-Minute Express Process</span>
                    </span>
                    <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      Spot Cash or UPI / IMPS
                    </span>
                  </div>
                  <ul className="text-[11px] sm:text-xs text-stone-300 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span><strong>100% Karatmeter Assay</strong> in front of you — zero melting loss.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span><strong>Highest market bullion rate guarantee</strong> in Bhubaneswar.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>No stone weight deduction trickery — complete transparent computerized invoice.</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-[#051810] border border-[#C5A059]/40 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#DFBA73] font-semibold flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Exchange &amp; Upgrade Privilege</span>
                    </span>
                    <span className="text-[10px] bg-amber-950 border border-[#DFBA73]/50 text-[#FFE3A3] font-bold px-2 py-0.5 rounded-full">
                      +3% Extra Purity Value
                    </span>
                  </div>
                  <ul className="text-[11px] sm:text-xs text-stone-300 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span><strong>Get +3% extra value</strong> credited toward any new jewellery design.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span><strong>Flat 25% OFF Making Charges</strong> on brand new 22K/24K creations.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>Lifetime exchange guarantee &amp; 100% BIS 916 Hallmark certificate.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Interactive Quick Payout Estimator */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Live Payout Calculator
                  </span>
                  <div className="flex items-center space-x-1.5 text-[11px] text-[#DFBA73]">
                    <TrendingUp className="w-3 h-3" />
                    <span>22K Live: ₹{LIVE_RATES.gold22k}/g</span>
                  </div>
                </div>

                {/* Weight Presets */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] text-stone-400 shrink-0">Weight:</span>
                  {[5, 10, 20, 50].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setGoldWeight(w)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        goldWeight === w
                          ? "bg-[#DFBA73] text-stone-950"
                          : "bg-white/10 text-stone-300 hover:bg-white/20"
                      }`}
                    >
                      {w}g
                    </button>
                  ))}
                  <div className="relative flex-1 min-w-[70px]">
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={goldWeight || ""}
                      onChange={(e) => setGoldWeight(Number(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs text-white text-right focus:outline-hidden focus:border-[#DFBA73]"
                      placeholder="Custom"
                    />
                    <span className="absolute left-2 top-1 text-[10px] text-stone-400">g</span>
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="bg-gradient-to-r from-[#DFBA73]/20 via-[#C5A059]/15 to-transparent border border-[#DFBA73]/40 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">
                      Estimated Instant Value
                    </p>
                    <p className="text-xl sm:text-2xl font-serif font-bold text-[#FFE3A3] leading-none mt-1">
                      ₹{estimatedPayout.toLocaleString("en-IN")}*
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      5-Min Spot Payout
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://wa.me/917008343796?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFBA73] via-[#FFE3A3] to-[#C5A059] text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:brightness-105 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-stone-950" />
                  <span>Claim 5-Min Cash Valuation via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between text-xs text-stone-400 px-1 pt-1">
                  <a
                    href="tel:+917008343796"
                    className="flex items-center space-x-1.5 text-[#DFBA73] hover:underline cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Showroom: 70083 43796</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>

              {/* Trust Footer Badges */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-400">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-[#DFBA73]" />
                  <span>100% Karatmeter Purity</span>
                </span>
                <span>•</span>
                <span>Zero Hidden Deductions</span>
                <span>•</span>
                <span>Govt ID Required</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

