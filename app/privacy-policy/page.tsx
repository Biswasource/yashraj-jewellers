import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  Lock,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Yashraj Jewellers Cuttack",
  description:
    "Official Privacy Policy of Yashraj Jewellers, Basulisahi Rd, Maachhua Bazar, Cuttack, Odisha. Learn how we safeguard your personal data, KYC details, and transaction privacy.",
};

export default function PrivacyPolicyPage() {
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
              <span className="text-[#DFBA73]">Privacy Policy</span>
            </nav>

            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#05291C] border border-[#DFBA73]/40 text-[#DFBA73] text-[11px] font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Customer Data Protection</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-[#C5DDD2] max-w-2xl mx-auto leading-relaxed">
              Yashraj Jewellers is committed to ensuring complete confidentiality, data protection, and transparency for every customer, client, and patron.
            </p>
            <p className="text-xs text-stone-400">
              Effective Date: January 1, 2026 • Last Reviewed: November 2026
            </p>
          </div>
        </section>

        {/* 3 CORE PILLARS OF PRIVACY */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">100% Confidential</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Your valuation, bullion purchases, selling records, and bank release assistance details are never shared with unauthorized third parties.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">Statutory KYC Compliance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Customer identity records (PAN, Aadhaar) are gathered strictly in compliance with Govt of India PMLA and RBI bullion regulations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-lg space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">Secure Bank Release</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bank loan documentation and pawn slips used for bank gold releases are safely handed back to you immediately upon settlement.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 text-stone-800 text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">1.</span>
              <span>About Yashraj Jewellers</span>
            </h2>
            <p className="text-stone-700">
              Yashraj Jewellers is a premier luxury gold and silver establishment based in Cuttack, Odisha. We provide certified BIS 916 hallmarked gold, diamond solitaires, authentic Odisha Tarakasi silver filigree, direct gold wholesaling, instant cash for old gold and silver, and professional bank gold release assistance across Odisha.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-1 text-stone-700">
              <p><strong>Registered Store Location:</strong> Basulisahi Rd, Maachhua Bazar (Machua Bazzar), Cuttack, Odisha 753001</p>
              <p><strong>Customer Helpline:</strong> +91 8917652306 / +91 9583126745 / +91 7008343796 / 072054 70638</p>
              <p><strong>Official Social Media:</strong> <a href="https://www.instagram.com/yash.raj_jewellers/" target="_blank" rel="noopener noreferrer" className="text-[#8F6D2C] underline">@yash.raj_jewellers</a></p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">2.</span>
              <span>Information We Collect</span>
            </h2>
            <p className="text-stone-700">
              Depending on the nature of your interaction (retail shopping, selling old gold/silver, or bank release assistance), we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>
                <strong>Contact Details:</strong> Your full name, telephone / WhatsApp number, billing address, and email address for order receipts and bullion rate updates.
              </li>
              <li>
                <strong>Government-Mandated KYC:</strong> Proof of identity and address (Aadhaar Card, Voter ID, Passport, Driving License) and Permanent Account Number (PAN Card). In accordance with Government of India regulations and the Prevention of Money Laundering Act (PMLA), PAN details are legally mandatory for cash transactions or precious metal transactions exceeding prescribed statutory thresholds.
              </li>
              <li>
                <strong>Pledged Loan &amp; Bank Documentation:</strong> When engaging our Bank Gold Release Assistance, we examine the pledge token, bank pledge slip, and loan closure statement provided by your financing bank or NBFC solely to facilitate loan settlement.
              </li>
              <li>
                <strong>Transaction History &amp; Spectral Assays:</strong> Itemized invoice history, carat purity spectrometer readings, and payment mode receipts.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">3.</span>
              <span>How We Use Your Information</span>
            </h2>
            <p className="text-stone-700">
              The collected information is used strictly for legitimate commercial and legal purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <p className="font-semibold text-stone-900 text-xs">Instant Cash Payouts &amp; Settlements</p>
                <p className="text-[11px] text-stone-600 mt-1">To verify legal ownership, process cash or instant bank IMPS/RTGS transfers within 5 minutes.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <p className="font-semibold text-stone-900 text-xs">Bank Gold Release Coordination</p>
                <p className="text-[11px] text-stone-600 mt-1">To clear your loan account directly with your bank/NBFC and ensure safe handover of released ornaments.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <p className="font-semibold text-stone-900 text-xs">BIS Hallmarking &amp; Tax Compliance</p>
                <p className="text-[11px] text-stone-600 mt-1">To generate authentic tax invoices complying with 3% GST and laser HUID record retention.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <p className="font-semibold text-stone-900 text-xs">Customer Communication</p>
                <p className="text-[11px] text-stone-600 mt-1">To provide order updates, digital receipts, and VIP morning gold bullion alerts upon request.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">4.</span>
              <span>Instant Cash &amp; Bank Release Discretion</span>
            </h2>
            <p className="text-stone-700">
              We understand the sensitive nature of releasing pledged bank gold or selling personal jewellery. Yashraj Jewellers treats all evaluations, loan closures, and payout conversations with the utmost discretion and dignity.
            </p>
            <div className="flex items-start space-x-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p>
                All purity evaluations are performed right before your eyes using advanced non-destructive X-ray fluorescence (XRF) spectrometers. We never retain loan documents or collateral receipts beyond the immediate scope of release.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">5.</span>
              <span>Data Protection &amp; Security</span>
            </h2>
            <p className="text-stone-700">
              We implement comprehensive physical, digital, and procedural safeguards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>KYC documents and billing archives are stored in encrypted databases with restricted access limited to authorized compliance personnel.</li>
              <li>Physical showroom CCTV footage is maintained strictly for security purposes and is automatically overwritten after the statutory retention period.</li>
              <li>We never sell, rent, lease, or monetize customer telephone numbers, email addresses, or transaction data to marketing agencies or third parties.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">6.</span>
              <span>Statutory Legal Disclosures</span>
            </h2>
            <p className="text-stone-700">
              Yashraj Jewellers complies fully with all applicable laws of the Republic of India. In circumstances where we receive a valid summons, court order, or formal investigation inquiry from a recognized statutory authority (such as the Income Tax Department, Directorate of Enforcement, or Police authorities), we are legally bound to cooperate as required by Indian law.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
              <span className="text-[#8F6D2C]">7.</span>
              <span>Contact Our Grievance &amp; Privacy Officer</span>
            </h2>
            <p className="text-stone-700">
              For any questions regarding this Privacy Policy, your personal data, or to update your contact preferences, please reach out to our showroom administration:
            </p>
            <div className="bg-[#FAF9F5] border border-[#E8DFC8] rounded-2xl p-5 space-y-3 text-xs text-stone-800">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Yashraj Jewellers Showroom:</strong>
                  <p className="text-stone-600">Basulisahi Rd, Maachhua Bazar (Machua Bazzar), Cuttack, Odisha 753001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Phone Numbers:</strong>
                  <p className="text-stone-600">
                    <a href="tel:8917652306" className="text-stone-900 font-medium hover:underline">+91 89176 52306</a> /{" "}
                    <a href="tel:9583126745" className="text-stone-900 font-medium hover:underline">+91 95831 26745</a> /{" "}
                    <a href="tel:7008343796" className="text-stone-900 font-medium hover:underline">+91 70083 43796</a> /{" "}
                    <a href="tel:07205470638" className="text-stone-900 font-medium hover:underline">072054 70638</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Email Inquiries:</strong>
                  <p className="text-stone-600">contact@yashrajjewellers.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong>Showroom Working Hours:</strong>
                  <p className="text-stone-600">10:30 AM – 8:30 PM (All 7 Days Open)</p>
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

