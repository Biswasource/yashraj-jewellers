"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Zap,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
  Award,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function InstantCashGoldModal() {
  const [isOpen, setIsOpen] = useState(false);
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

  const whatsappMessage = encodeURIComponent(
    `Namaste Yashraj Jewellers!\n\nI saw your Gold Cash & Exchange offer on your website:\n- Selected Option: ${
      selectedMode === "cash"
        ? "Instant Spot Cash / Bank IMPS in 5 Minutes"
        : "Exchange for New Jewellery (+3% Extra Purity Value & 25% Off Making Charges)"
    }\n\nPlease share today's live bullion rate and showroom timing for Karatmeter digital testing.\n\nThank you!`
  );

  return (
    <>
      {/* Floating Reopen Button if modal was closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-4 sm:left-6 z-40 bg-[#093B2A] text-[#DFBA73] px-4 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border-2 border-[#DFBA73] cursor-pointer"
          title="Instant Cash for Old Gold"
        >
          <Zap className="w-4 h-4 text-[#DFBA73] fill-[#DFBA73]" />
          <span className="font-sans font-extrabold text-[#FFE8B8]">Instant Cash for Gold</span>
        </button>
      )}

      {/* Main Luxury Modal Backdrop (Emerald Green Website Theme - No Pitch Black) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-[#042419]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg bg-gradient-to-b from-[#093B2A] via-[#062F21] to-[#042419] text-[#E8F3EE] rounded-3xl border-2 border-[#DFBA73]/60 shadow-[0_20px_60px_rgba(4,36,25,0.7)] overflow-hidden my-auto max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Golden Flash Banner */}
            <div className="bg-gradient-to-r from-[#DFBA73] via-[#FFE3A3] to-[#C5A059] text-[#093B2A] font-bold text-[11px] sm:text-xs uppercase tracking-[0.16em] py-2 px-4 text-center flex items-center justify-center space-x-2 shadow-inner">
              <Zap className="w-3.5 h-3.5 fill-[#093B2A]" />
              <span>5-Minute Express Payout • Highest Rate in Odisha</span>
            </div>

            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-3 relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FFE8B8] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close offer modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-[#DFBA73] uppercase tracking-[0.2em] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>Special Customer Offer</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Instant Cash or Exchange for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE8B8] via-[#DFBA73] to-[#C5A059]">
                  Old Gold
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#C5DDD2] font-sans mt-1.5 leading-relaxed">
                Turn your gold jewellery into immediate cash or upgrade at live bullion rates with 100% Karatmeter testing.
              </p>
            </div>

            {/* Modal Body / Offer Options */}
            <div className="px-5 sm:px-6 pb-6 overflow-y-auto space-y-4">
              {/* Choice Tabs: Cash vs Exchange */}
              <div className="grid grid-cols-2 gap-2 bg-[#042419]/70 p-1.5 rounded-2xl border border-[#DFBA73]/30">
                <button
                  type="button"
                  onClick={() => setSelectedMode("cash")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    selectedMode === "cash"
                      ? "bg-gradient-to-r from-[#DFBA73] to-[#C5A059] text-[#093B2A] shadow-md"
                      : "text-[#C5DDD2] hover:text-white"
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
                      ? "bg-gradient-to-r from-[#DFBA73] to-[#C5A059] text-[#093B2A] shadow-md"
                      : "text-[#C5DDD2] hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exchange (+3% Bonus)</span>
                </button>
              </div>

              {/* Offer Highlight Box */}
              {selectedMode === "cash" ? (
                <div className="bg-[#05291C] border border-[#DFBA73]/35 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#DFBA73] font-semibold flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>5-Minute Settlement</span>
                    </span>
                    <span className="text-[10px] bg-[#093B2A] border border-[#DFBA73]/40 text-[#FFE3A3] font-bold px-2 py-0.5 rounded-full">
                      Spot Cash or UPI / IMPS
                    </span>
                  </div>
                  <ul className="text-xs text-[#E8F3EE] space-y-1.5">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>Live digital Karatmeter assay in front of you — zero melting loss.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>Guaranteed highest market valuation with transparent invoice.</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-[#05291C] border border-[#DFBA73]/35 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#DFBA73] font-semibold flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>Jewellery Upgrade Privilege</span>
                    </span>
                    <span className="text-[10px] bg-[#093B2A] border border-[#DFBA73]/40 text-[#FFE3A3] font-bold px-2 py-0.5 rounded-full">
                      +3% Extra Purity Value
                    </span>
                  </div>
                  <ul className="text-xs text-[#E8F3EE] space-y-1.5">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>+3% extra valuation on old gold credited toward your new purchase.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                      <span>Flat 25% OFF making charges on all new 22K/24K hallmarked jewellery.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://wa.me/917008343796?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFBA73] via-[#FFE3A3] to-[#C5A059] text-[#093B2A] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:brightness-105 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-[#093B2A]" />
                  <span>Claim Valuation via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between text-xs text-[#C5DDD2] px-1 pt-1">
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
                    className="text-[#C5DDD2] hover:text-white transition cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>

              {/* Trust Footer Badges */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-center space-x-3 text-[10px] text-[#C5DDD2]">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFBA73]" />
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


