"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {

  return (
    <footer className="bg-gradient-to-b from-[#093B2A] via-[#062F21] to-[#042419] text-[#E8F3EE] border-t border-[#DFBA73]/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* DIRECTORY (BRAND & SERVICES • SHOP LOCATION MAP • CONTACT CARE) */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          {/* COLUMN 1: BRAND INFO & KEY SERVICES (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
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
                  Luxury Gold &amp; Silver Store • Cuttack
                </p>
              </div>
            </div>

            <p className="text-[#E8F3EE]/85 text-xs leading-relaxed">
              Yashraj Jewellers is a luxury gold and silver store located in Cuttack, Odisha. We buy and sell gold and silver with instant cash within 5 minutes, provide bank gold release assistance, and operate across Odisha with transparent market pricing.
            </p>

            {/* Key Services Box */}
            <div className="bg-[#05291C] border border-[#DFBA73]/30 rounded-xl p-3.5 space-y-2 text-[#C5DDD2]">
              <p className="font-serif font-bold text-xs text-[#DFBA73] uppercase tracking-wider">
                Key Services:
              </p>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0 mt-0.5" />
                  <span>
                    <strong>Buy &amp; Sell Gold &amp; Silver:</strong> Instant cash payout within 5 minutes.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0 mt-0.5" />
                  <span>
                    <strong>Bank Gold Release Assistance:</strong> Complete loan payoff &amp; gold retrieval.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparent Market Pricing:</strong> Market price minus 5%, minimal paperwork, zero hidden charges.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: SHOP LOCATION / GOOGLE MAP EMBED (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#DFBA73] uppercase tracking-wider border-b border-[#124831] pb-2 flex items-center justify-between">
              <span>Showroom Location</span>
              <span className="text-[10px] text-[#C5DDD2] font-sans font-normal tracking-normal lowercase">Cuttack, Odisha</span>
            </h5>

            {/* Google Maps Embed iframe */}
            <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden border border-[#DFBA73]/40 shadow-lg bg-[#05291C] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.8175951568196!2d85.8815927742986!3d20.472683681041115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d8754196e5d%3A0x26501d42b0be5dcb!2sYASHRAJ%20JEWELLERS!5e0!3m2!1sen!2sin!4v1794741805969!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Yashraj Jewellers Showroom Map"
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#C5DDD2]">
              <span className="truncate pr-2">Basulisahi Rd, Maachhua Bazar, Cuttack</span>
              <a
                href="https://www.google.com/search?kgmid=%2Fg%2F11z8p894mn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DFBA73] hover:underline shrink-0 flex items-center space-x-1 font-semibold"
              >
                <span>Google Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* COLUMN 3: CONTACT INFORMATION & STORE TIMINGS (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#DFBA73] uppercase tracking-wider border-b border-[#124831] pb-2">
              Visit Showroom &amp; Contact
            </h5>

            <div className="space-y-2.5 text-[#E8F3EE]/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#DFBA73] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white">Store Address:</strong>
                  <p className="text-[#C5DDD2] mt-0.5 leading-relaxed">
                    Basulisahi Rd, Maachhua Bazar (Machua Bazzar), Cuttack, Odisha 753001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#DFBA73] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white">Phone Numbers:</strong>
                  <div className="text-[#C5DDD2] mt-0.5 space-y-0.5">
                    <p>
                      <a href="tel:8917652306" className="hover:text-[#DFBA73] transition font-medium">
                        +91 89176 52306
                      </a>{" "}
                      •{" "}
                      <a href="tel:9583126745" className="hover:text-[#DFBA73] transition font-medium">
                        +91 95831 26745
                      </a>
                    </p>
                    <p>
                      <a href="tel:7008343796" className="hover:text-[#DFBA73] transition font-medium">
                        +91 70083 43796
                      </a>{" "}
                      •{" "}
                      <a href="tel:07205470638" className="hover:text-[#DFBA73] transition font-medium">
                        072054 70638
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <a href="mailto:contact@yashrajjewellers.com" className="hover:text-[#DFBA73] transition text-[#C5DDD2]">
                  contact@yashrajjewellers.com
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <svg className="w-4 h-4 text-[#DFBA73] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <a
                  href="https://www.instagram.com/yash.raj_jewellers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DFBA73] transition underline font-medium text-[#C5DDD2]"
                >
                  Follow on Instagram: @yash.raj_jewellers
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#DFBA73] shrink-0" />
                <span className="text-[#C5DDD2]">10:30 AM – 8:30 PM (All 7 Days Open)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT & POLICY LINKS */}
        <div className="pt-8 border-t border-[#124831] flex flex-col md:flex-row items-center justify-between text-[#A3C4B7] text-[11px] gap-4">
          <p>© 2026 Yashraj Jewellers. All Rights Reserved. Hallmarked &amp; Certified by Govt of India BIS.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Link href="/privacy-policy" className="hover:text-[#DFBA73] transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-of-billing" className="hover:text-[#DFBA73] transition">
              Terms of Billing
            </Link>
            <span>•</span>
            <Link href="/exchange-buyback-policy" className="hover:text-[#DFBA73] transition">
              Exchange &amp; Buyback Policy
            </Link>
            <span>•</span>
            <a
              href="https://www.instagram.com/yash.raj_jewellers/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DFBA73] hover:underline flex items-center space-x-1 font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow on Instagram</span>
            </a>
            <span>•</span>
            <a
              href="https://www.google.com/search?kgmid=%2Fg%2F11z8p894mn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DFBA73] hover:underline"
            >
              Google Profile
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
