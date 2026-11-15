import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Banknote,
  Building2,
  Scale,
  Receipt,
  Percent,
  AlertCircle,
  HelpCircle,
  Phone,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Terms of Billing & Wholesale Pricing | Yashraj Jewellers Cuttack",
  description:
    "Transparent Billing Terms, Wholesale Pricing Formula, and Instant Cash Payment Conditions at Yashraj Jewellers, Maachhua Bazar, Cuttack. Market price minus 5%, zero hidden charges.",
};

export default function TermsOfBillingPage() {
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
              <span className="text-[#DFBA73]">Terms of Billing</span>
            </nav>

            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#05291C] border border-[#DFBA73]/40 text-[#DFBA73] text-[11px] font-bold tracking-widest uppercase">
              <Receipt className="w-3.5 h-3.5" />
              <span>Transparent Wholesale Billing</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Terms of Billing
            </h1>
            <p className="text-sm sm:text-base text-[#C5DDD2] max-w-2xl mx-auto leading-relaxed">
              Transparent market pricing, itemized tax invoices, direct wholesale rates, and guaranteed zero hidden deductions.
            </p>
            <p className="text-xs text-stone-400">
              Cuttack &amp; Odisha Bullion Billing Standards • Effective 2026
            </p>
          </div>
        </section>

        {/* 4 HIGHLIGHT CARDS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Market Price - 5%</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                When selling gold or silver, get live market price minus only a transparent 5% service margin. No hidden melting cuts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Instant Cash in 5 Mins</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Receive spot cash or immediate IMPS/RTGS bank payout within 5 minutes with minimal documentation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Bank Gold Release</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We clear your pledged gold loan with banks or NBFCs and disburse the remaining profit directly to you.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-stone-900">100% Itemized Bill</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Full transparency with separate line items for gross weight, stone weight, net weight, purity, and GST.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 text-stone-800 text-sm leading-relaxed">
          {/* Section 1: Pricing Calculation Formula */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">1.</span>
              <span>Transparent Retail &amp; Wholesale Pricing Formula</span>
            </h2>
            <p className="text-stone-700">
              At Yashraj Jewellers, every purchase invoice is generated using an open, transparent formula so you know exactly what you pay for:
            </p>

            <div className="bg-[#FAF9F5] border border-[#E8DFC8] rounded-2xl p-5 space-y-3">
              <p className="font-serif font-bold text-stone-900 text-sm">
                Final Invoice Amount = [Net Metal Weight (g) × Live Gold Rate (₹/g)] + Making Charges + 3% GST
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 pt-2 border-t border-[#E8DFC8]">
                <p>
                  <strong>• Net Metal Weight:</strong> Total ornament weight minus exact weight of stones, pearls, or enamel. You never pay gold price for non-gold components.
                </p>
                <p>
                  <strong>• Live Bullion Rate:</strong> Based on the certified live market board displayed openly on our showroom rate screen.
                </p>
                <p>
                  <strong>• Minimal Wholesale Making Charges:</strong> Direct wholesale margins offering significant savings compared to standard retail showrooms.
                </p>
                <p>
                  <strong>• Statutory 3% GST:</strong> Mandatory central &amp; state goods and services tax charged strictly as per Govt of India tax law.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Selling Gold & Silver for Instant Cash */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">2.</span>
              <span>Selling Gold &amp; Silver (Instant Cash in 5 Minutes)</span>
            </h2>
            <p className="text-stone-700">
              Yashraj Jewellers is Odisha’s leading destination to sell old gold, broken ornaments, coins, and silver items with guaranteed speed and fairness:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-emerald-950">
                  <p className="font-bold">Transparent Pricing: Live Market Rate Minus 5%</p>
                  <p>
                    Unlike unorganized pawnbrokers who deduct 15% to 25% for arbitrary melting loss or impurities, Yashraj Jewellers operates on a clear formula: <strong>Market Price minus only 5%</strong> with zero hidden deductions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-amber-950">
                  <p className="font-bold">Instant Payout Within 5 Minutes</p>
                  <p>
                    The evaluation and payout process is completed in just 5 minutes. Customers can choose between spot cash (within statutory Income Tax limits) or instantaneous digital bank transfer (IMPS / RTGS / NEFT) credited directly to their verified bank account.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-blue-950">
                  <p className="font-bold">German XRF Computerized Assaying (No Damage to Jewellery)</p>
                  <p>
                    Your gold and silver are evaluated on high-precision Class II certified electronic balances and tested on non-destructive German X-ray fluorescence (XRF) spectrometers in your full presence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Bank Gold Release Assistance */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">3.</span>
              <span>Bank Gold Release Assistance Terms</span>
            </h2>
            <p className="text-stone-700">
              If your gold is pledged with nationalized banks (SBI, Canara Bank, Bank of Baroda, etc.), private lenders (HDFC, ICICI, Axis), or NBFCs (Muthoot Finance, Manappuram Finance):
            </p>

            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-200 text-xs">
              <div className="p-4 bg-stone-50 flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-[#093B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                <div>
                  <p className="font-bold text-stone-900">Pledge Document Assessment</p>
                  <p className="text-stone-600 mt-0.5">Bring your pawn slip or loan statement. We calculate the exact valuation at Market Price - 5% and determine your surplus payout before initiating the release.</p>
                </div>
              </div>

              <div className="p-4 bg-white flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-[#093B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                <div>
                  <p className="font-bold text-stone-900">Direct Loan Clearance</p>
                  <p className="text-stone-600 mt-0.5">Yashraj Jewellers advances the necessary funds to settle the principal plus interest directly with your bank/NBFC. You do not need to arrange upfront cash.</p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-[#093B2A] text-white flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                <div>
                  <p className="font-bold text-stone-900">Handover &amp; Instant Cash Balance</p>
                  <p className="text-stone-600 mt-0.5">The released gold is weighed and tested at our showroom in your presence. We deduct the bank settlement amount from the total valuation and disburse the remaining profit to you within 5 minutes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Mandatory Documentation & KYC */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">4.</span>
              <span>Minimal Paperwork &amp; KYC Requirements</span>
            </h2>
            <p className="text-stone-700">
              To sell gold/silver or utilize our bank release service, we require only minimal, straightforward documentation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <p className="font-bold text-stone-900">1. Government Photo ID Proof</p>
                <p className="text-stone-600 mt-1">Aadhaar Card, Voter ID, Passport, or Valid Driving License.</p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <p className="font-bold text-stone-900">2. PAN Card</p>
                <p className="text-stone-600 mt-1">Mandatory for high-value transactions as stipulated by Indian Income Tax and PMLA norms.</p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <p className="font-bold text-stone-900">3. Active Bank Account (for Bank Transfer)</p>
                <p className="text-stone-600 mt-1">Cancelled cheque or passbook copy matching the seller&apos;s name for instant IMPS / RTGS transfers.</p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <p className="font-bold text-stone-900">4. Purchase Proof / Pledge Token</p>
                <p className="text-stone-600 mt-1">Original purchase invoice (if available) or original bank pledge slip in the customer&apos;s name.</p>
              </div>
            </div>
          </div>

          {/* Section 5: BIS 916 Hallmarking & Tax Compliance */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">5.</span>
              <span>BIS 916 Hallmarking &amp; Tax Compliance</span>
            </h2>
            <p className="text-stone-700">
              Every piece of gold jewellery sold at Yashraj Jewellers carries 100% BIS Hallmarking under the Bureau of Indian Standards, featuring:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li><strong>BIS Triangle Logo:</strong> Certifying government-approved assaying.</li>
              <li><strong>Purity Mark:</strong> 22K916 (91.6% pure gold), 18K750 (75.0% pure gold), or 24K999 (pure gold bullion).</li>
              <li><strong>6-Digit Laser HUID:</strong> Unique alphanumeric Hallmarking Unique Identification code traceable through the BIS Care App.</li>
            </ul>
          </div>

          {/* Section 6: Payment Methods Accepted */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">6.</span>
              <span>Accepted Payment Methods</span>
            </h2>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2 text-stone-700">
              <p>
                <strong>Purchasing Jewellery:</strong> UPI (Google Pay, PhonePe, Paytm, BHIM), RTGS / NEFT, Net Banking, Debit / Credit Cards, and Cash (strictly up to ₹1,99,999 per transaction as mandated by Section 269ST of the Income Tax Act).
              </p>
              <p>
                <strong>Selling Gold / Bank Release Payouts:</strong> Instant Spot Cash (within legal limits) or Instant Bank Transfer (IMPS / RTGS) credited within 5 minutes.
              </p>
            </div>
          </div>

          {/* Section 7: Store Location & Assistance */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">7.</span>
              <span>Billing Support &amp; Enquiries</span>
            </h2>
            <div className="bg-[#FAF9F5] border border-[#E8DFC8] rounded-2xl p-5 space-y-3 text-xs text-stone-800">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Showroom Address:</strong>
                  <p className="text-stone-600">Basulisahi Rd, Maachhua Bazar (Machua Bazzar), Cuttack, Odisha 753001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Helpline for Instant Cash &amp; Bank Release:</strong>
                  <p className="text-stone-600">
                    <a href="tel:8917652306" className="text-stone-900 font-medium hover:underline">+91 89176 52306</a> /{" "}
                    <a href="tel:9583126745" className="text-stone-900 font-medium hover:underline">+91 95831 26745</a> /{" "}
                    <a href="tel:7008343796" className="text-stone-900 font-medium hover:underline">+91 70083 43796</a> /{" "}
                    <a href="tel:07205470638" className="text-stone-900 font-medium hover:underline">072054 70638</a>
                  </p>
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

