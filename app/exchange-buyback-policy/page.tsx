import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Banknote,
  Building2,
  Scale,
  ShieldCheck,
  ChevronRight,
  Phone,
  MapPin,
  ArrowRight,
  Gem,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Exchange & Buyback Policy | Yashraj Jewellers Cuttack",
  description:
    "Lifetime Gold, Diamond & Silver Exchange & Buyback Policy at Yashraj Jewellers, Cuttack. Instant cash within 5 minutes, Market Price - 5%, and Bank Gold Release Assistance.",
};

export default function ExchangeBuybackPolicyPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col selection:bg-[#DFBA73]/30 selection:text-stone-900">
      <Navbar />

      <main className="flex-1">
        {/* HERO BANNER */}
        <section className="bg-gradient-to-b from-[#093B2A] via-[#062F21] to-[#042419] text-white py-14 sm:py-18 relative overflow-hidden border-b border-[#DFBA73]/40">
          <div className="absolute inset-0 bg-[radial-gradient(#DFBA73_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center space-x-2 text-xs text-[#C5DDD2] font-medium mb-2">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#DFBA73]">Exchange &amp; Buyback Policy</span>
            </nav>

            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#05291C] border border-[#DFBA73]/40 text-[#DFBA73] text-[11px] font-bold tracking-widest uppercase">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Lifetime Trust &amp; Liquidity</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Exchange &amp; Buyback Policy
            </h1>
            <p className="text-sm sm:text-base text-[#C5DDD2] max-w-2xl mx-auto leading-relaxed">
              Transparent valuation, instant cash within 5 minutes, 100% net gold weight exchange, and professional bank gold release assistance across Odisha.
            </p>
            <p className="text-xs text-stone-400">
              Guaranteed by Yashraj Jewellers, Maachhua Bazar, Cuttack • Effective 2026
            </p>
          </div>
        </section>

        {/* 4 CORE ADVANTAGES */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Cash in 5 Minutes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sell old gold or silver and receive spot cash or instant bank IMPS transfer in under 5 minutes with minimal paperwork.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Market Rate - 5%</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Straightforward buyback formula: Live prevailing market price minus only a 5% margin. Zero hidden melting cuts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Bank Gold Release</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We advance the funds to clear your gold loan at banks/NBFCs, release your jewellery, and hand you the surplus cash.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">100% Gold Exchange</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Get 100% value of your net gold weight credited at the day’s live rate when upgrading to any new jewellery creation.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 text-stone-800 text-sm leading-relaxed">
          {/* Section 1: Selling Gold & Silver for Instant Cash */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">1.</span>
              <span>Selling Gold &amp; Silver (Instant Cash Buyback)</span>
            </h2>
            <p className="text-stone-700">
              Yashraj Jewellers buys old gold, antique jewellery, broken chains, scrap gold, gold coins, 24K bars, and silver items with unmatched transparency and speed:
            </p>

            <div className="bg-[#FAF9F5] border border-[#E8DFC8] rounded-2xl p-5 space-y-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                How Our 5-Minute Buyback Process Works:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-3 bg-white rounded-xl border border-[#E8DFC8] space-y-1">
                  <p className="font-bold text-[#8F6D2C]">Step 1: Clean Weighing</p>
                  <p className="text-stone-600">
                    Ornaments are weighed on government-certified Class II electronic precision scales right before your eyes.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8DFC8] space-y-1">
                  <p className="font-bold text-[#8F6D2C]">Step 2: German XRF Testing</p>
                  <p className="text-stone-600">
                    Non-destructive X-ray assaying measures exact gold/silver purity to two decimal places without melting or cutting.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8DFC8] space-y-1">
                  <p className="font-bold text-[#8F6D2C]">Step 3: Instant Payout</p>
                  <p className="text-stone-600">
                    Calculated at <strong>Market Rate minus 5%</strong>. Spot cash handed over or instant bank IMPS transfer credited within 5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bank Gold Release Assistance */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">2.</span>
              <span>Bank Gold Release Assistance Across Odisha</span>
            </h2>
            <p className="text-stone-700">
              Pledging gold to high-interest financiers or banks often leads to compounding interest. If you want to release your mortgaged gold, Yashraj Jewellers provides complete financial backing and physical assistance across Odisha:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">We Pay the Bank Directly</p>
                  <p className="mt-0.5">
                    You do not need to borrow money or arrange upfront funds. Our team pays off your principal loan and interest directly to Muthoot Finance, Manappuram, SBI, HDFC, Canara Bank, or any scheduled institution.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950 text-xs">
                <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Immediate Release &amp; Surplus Payout</p>
                  <p className="mt-0.5">
                    Once the jewellery is collected from the branch, it is brought to our showroom. We deduct the bank loan settlement amount from the total valuation (Market Rate - 5%) and immediately hand you the surplus balance in cash or bank transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Jewellery Exchange Policy */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">3.</span>
              <span>Exchange Policy for New Jewellery</span>
            </h2>
            <p className="text-stone-700">
              Upgrade your older jewellery to the latest 22K bridal designs, antique chokers, or certified solitaires under our generous exchange terms:
            </p>

            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-200 text-xs">
              <div className="p-4 bg-stone-50">
                <p className="font-bold text-stone-900">Exchange of Yashraj BIS 916 Hallmarked Jewellery</p>
                <p className="text-stone-600 mt-1">
                  Enjoy <strong>100% exchange value</strong> on net gold weight at the prevailing day&apos;s bullion rate. Zero deduction on gold value.
                </p>
              </div>

              <div className="p-4 bg-white">
                <p className="font-bold text-stone-900">Exchange of Other Jewellers&apos; Gold Ornaments</p>
                <p className="text-stone-600 mt-1">
                  Purity is determined by computerised XRF assaying. Net gold weight is credited at the day’s prevailing market rate towards your new purchase with minimal processing adjustments.
                </p>
              </div>

              <div className="p-4 bg-stone-50">
                <p className="font-bold text-stone-900">Certified Diamond Jewellery Exchange</p>
                <p className="text-stone-600 mt-1">
                  Natural diamond solitaires and diamond-studded jewellery purchased with certification receive 100% gold weight value plus 90% prevailing diamond value against new diamond purchases.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Silver & Odisha Tarakasi Filigree */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">4.</span>
              <span>Silver &amp; Cuttack Tarakasi Filigree Policy</span>
            </h2>
            <p className="text-stone-700">
              As a proud purveyor of authentic GI-tagged Cuttack Tarakasi silver filigree, Yashraj Jewellers offers transparent buyback and exchange for 92.5 Sterling Silver and fine silver articles:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>Silver utensils, idols, puja articles, and antique filigree are evaluated on computerized assayers.</li>
              <li>Pure silver content is valued at the day&apos;s live silver bullion board rate minus 5% service fee.</li>
              <li>Instant cash or credit towards new silver filigree masterpieces.</li>
            </ul>
          </div>

          {/* Section 5: Documents Required */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">5.</span>
              <span>Customer Verification &amp; Required Documents</span>
            </h2>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2 text-stone-700">
              <p>
                To comply with statutory regulations, sellers must be <strong>18 years of age or older</strong> and present:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Original Government ID: Aadhaar Card, Voter ID, Passport, or Driving License.</li>
                <li>PAN Card for transactions meeting regulatory reporting thresholds.</li>
                <li>Original loan pledge slip or bank token (for bank gold releases).</li>
              </ul>
            </div>
          </div>

          {/* Section 6: Contact & Visit Showroom */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">6.</span>
              <span>Contact for Evaluation or Bank Release</span>
            </h2>
            <div className="bg-[#FAF9F5] border border-[#E8DFC8] rounded-2xl p-5 space-y-3 text-xs text-stone-800">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Showroom Location:</strong>
                  <p className="text-stone-600">Basulisahi Rd, Maachhua Bazar (Machua Bazzar), Cuttack, Odisha 753001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Instant Cash &amp; Bank Gold Release Helplines:</strong>
                  <p className="text-stone-600">
                    <a href="tel:8917652306" className="text-stone-900 font-medium hover:underline">+91 89176 52306</a> /{" "}
                    <a href="tel:9583126745" className="text-stone-900 font-medium hover:underline">+91 95831 26745</a> /{" "}
                    <a href="tel:7008343796" className="text-stone-900 font-medium hover:underline">+91 70083 43796</a> /{" "}
                    <a href="tel:07205470638" className="text-stone-900 font-medium hover:underline">072054 70638</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Showroom Timings:</strong>
                  <p className="text-stone-600">Open 7 Days a Week • 10:30 AM to 8:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

