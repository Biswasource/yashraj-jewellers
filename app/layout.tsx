import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  weight: "400",
  variable: "--font-alex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yashraj Jewellers | Instant Cash for Gold • Gold Wholesaler • Best Jewellery",
  description:
    "Yashraj Jewellers — Sell old gold for instant cash at the best market price. Direct gold wholesaler with minimal prices, lowest making charges, BIS 916 hallmarked bridal jewellery, certified diamonds & silver.",
  keywords: [
    "Yashraj Jewellers",
    "Instant Cash for Gold",
    "Sell Gold at Best Price",
    "Gold Wholesaler",
    "Jewellery Wholesale Minimal Price",
    "Best Jewellery Bhubaneswar",
    "BIS 916 Hallmarked Gold",
    "Old Gold Exchange",
    "Bridal Jewellery Wholesale",
    "Odisha Tarakasi Filigree",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Yashraj Jewellers | Instant Cash for Gold • Gold Wholesaler",
    description:
      "Sell gold for instant spot cash at highest market price. Direct gold wholesaler with minimal making charges and 100% BIS Hallmarked purity.",
    images: [{ url: "/logo.png", width: 1080, height: 1080, alt: "Yashraj Jewellers Logo" }],
  },
};

import ClientProviders from "./components/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${alexBrush.variable}`}
    >
      <body className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#D4AF37]/20 selection:text-[#59420D]">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
