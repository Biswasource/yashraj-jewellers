"use client";

import React, { useState } from "react";
import { LIVE_RATES } from "../data/products";
import { TrendingUp, ShieldCheck, Calculator, RefreshCw, Info } from "lucide-react";

export default function LiveGoldRatesWidget() {
  const [selectedCity, setSelectedCity] = useState("Bhubaneswar");
  const [calcGrams, setCalcGrams] = useState(10);
  const [calcKarat, setCalcKarat] = useState<24 | 22 | 18>(22);

  const getRate = (karat: 24 | 22 | 18) => {
    if (karat === 24) return LIVE_RATES.gold24k;
    if (karat === 22) return LIVE_RATES.gold22k;
    return LIVE_RATES.gold18k;
  };

  const calculatedGoldVal = getRate(calcKarat) * calcGrams;
  const estimatedMaking = Math.round(calculatedGoldVal * 0.08); // avg 8%
  const estimatedGst = Math.round((calculatedGoldVal + estimatedMaking) * 0.03); // 3% GST
  const estimatedTotal = calculatedGoldVal + estimatedMaking + estimatedGst;

  return (
    <section className="bg-[#FAF3E0] py-12 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DEC9A2]">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8F6D2C] bg-[#F3E6C8] px-3 py-1 rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Bullion Desk</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F170F]">
              Daily Gold & Silver Rates
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Live certified market prices in Odisha with 100% transparent purity billing.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs">
            <span className="text-stone-500">City:</span>
            <div className="flex bg-white rounded-lg p-1 border border-[#DEC9A2] shadow-2xs">
              {["Bhubaneswar", "Cuttack", "Brahmapur", "Delhi"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition ${
                    selectedCity === city
                      ? "bg-[#8F6D2C] text-white shadow-xs"
                      : "text-stone-700 hover:text-[#8F6D2C]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bullion Rates Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 24K */}
          <div className="bg-white p-5 rounded-xl border border-[#DEC9A2] shadow-xs relative overflow-hidden group hover:border-[#8F6D2C] transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Pure Bullion
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  24 Karat Gold (999)
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {LIVE_RATES.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold font-mono text-[#8F6D2C]">
                ₹{LIVE_RATES.gold24k.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-stone-500">/ gram</span>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                ₹{(LIVE_RATES.gold24k * 10).toLocaleString("en-IN")} / 10 grams
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>99.9% Purity Coins & Bars</span>
              <span className="text-[#8F6D2C] font-semibold">NABL Assayed</span>
            </div>
          </div>

          {/* 22K */}
          <div className="bg-white p-5 rounded-xl border-2 border-[#C5A059] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#8F6D2C] text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-bl">
              Jewellery Standard
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-[#8F6D2C] uppercase tracking-wider">
                  BIS 916 Hallmark
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  22 Karat Gold (916)
                </h4>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold font-mono text-[#8F6D2C]">
                ₹{LIVE_RATES.gold22k.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-stone-500">/ gram</span>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                ₹{(LIVE_RATES.gold22k * 10).toLocaleString("en-IN")} / 10 grams
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Bridal, Chokers, Bangles</span>
              <span className="text-[#8F6D2C] font-semibold">Laser HUID Stamped</span>
            </div>
          </div>

          {/* 18K */}
          <div className="bg-white p-5 rounded-xl border border-[#DEC9A2] shadow-xs relative overflow-hidden group hover:border-[#8F6D2C] transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Diamond Setting
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  18 Karat Gold (750)
                </h4>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold font-mono text-[#8F6D2C]">
                ₹{LIVE_RATES.gold18k.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-stone-500">/ gram</span>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                ₹{(LIVE_RATES.gold18k * 10).toLocaleString("en-IN")} / 10 grams
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Solitaire Rings & Daily Wear</span>
              <span className="text-[#8F6D2C] font-semibold">IGI Certified</span>
            </div>
          </div>

          {/* Silver */}
          <div className="bg-white p-5 rounded-xl border border-[#DEC9A2] shadow-xs relative overflow-hidden group hover:border-[#8F6D2C] transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Sterling & Filigree
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  999 Fine Silver
                </h4>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold font-mono text-stone-800">
                ₹{LIVE_RATES.silver999}{" "}
                <span className="text-xs font-normal text-stone-500">/ gram</span>
              </p>
              <p className="text-xs text-stone-500 mt-1">
                ₹{(LIVE_RATES.silver999 * 1000).toLocaleString("en-IN")} / 1 Kilogram
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Odisha Tarakasi & Pooja Utensils</span>
              <span className="text-stone-700 font-semibold">925 Pure Hallmark</span>
            </div>
          </div>
        </div>

        {/* Interactive Gold Price Estimate Calculator */}
        <div className="bg-white p-6 rounded-2xl border border-[#DEC9A2] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <div className="flex items-center space-x-2 text-[#8F6D2C]">
              <Calculator className="w-5 h-5" />
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Transparent Billing Calculator
              </h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              At Yashraj Jewellers, every invoice clearly itemizes the gold weight, making charges, and 3% GST with zero hidden markups.
            </p>
          </div>

          {/* Calculator Controls */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div>
              <label className="block text-stone-500 font-medium mb-1">Purity Karat</label>
              <div className="flex border border-stone-200 rounded-lg overflow-hidden">
                {([24, 22, 18] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setCalcKarat(k)}
                    className={`px-3 py-1.5 font-bold transition ${
                      calcKarat === k ? "bg-[#8F6D2C] text-white" : "bg-stone-50 text-stone-700"
                    }`}
                  >
                    {k}K
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">Gold Weight (Grams)</label>
              <input
                type="number"
                min="1"
                max="500"
                value={calcGrams}
                onChange={(e) => setCalcGrams(Math.max(1, Number(e.target.value)))}
                className="w-24 px-3 py-1.5 border border-stone-200 rounded-lg text-stone-900 font-mono font-semibold text-center focus:outline-hidden focus:border-[#8F6D2C]"
              />
            </div>

            {/* Calculated Breakdown Box */}
            <div className="bg-[#FAF3E0] px-4 py-2 rounded-xl border border-[#DEC9A2] text-xs space-y-0.5 min-w-[200px]">
              <div className="flex justify-between text-stone-600">
                <span>Gold Value:</span>
                <span className="font-mono">₹{calculatedGoldVal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Est. Making (8%):</span>
                <span className="font-mono">₹{estimatedMaking.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>GST (3%):</span>
                <span className="font-mono">₹{estimatedGst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#8F6D2C] font-bold pt-1 border-t border-[#DEC9A2]">
                <span>Est. Total:</span>
                <span className="font-mono text-sm">₹{estimatedTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
