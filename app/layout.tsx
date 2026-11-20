import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Alex_Brush,
  Cormorant_Garamond,
  Cinzel,
} from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["500", "600", "700", "800"],
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yashrajjewellers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yashraj Jewellers | Instant Cash for Gold • Direct Gold Wholesaler • Best Jewellery",
    template: "%s | Yashraj Jewellers",
  },
  description:
    "Yashraj Jewellers — Sell old gold for instant cash in 5 minutes at highest market rate. Direct gold wholesaler with minimal making charges, 100% BIS 916 hallmarked bridal jewellery, certified diamonds & Cuttack silver filigree.",
  keywords: [
    "Yashraj Jewellers",
    "Instant Cash for Gold in 5 Minutes",
    "Sell Gold for Cash Bhubaneswar",
    "Gold Wholesaler Bhubaneswar",
    "Direct Jewellery Wholesaler Odisha",
    "BIS 916 Hallmarked Gold Jewellery",
    "Old Gold Exchange Highest Rate",
    "Best Jewellery Shop in Bhubaneswar",
    "Lowest Making Charges Gold Jewellery",
    "Bridal Gold Necklaces & Harams",
    "22KT Gold Jhumka & Bangles",
    "24KT Pure Gold Coins 999",
    "Cuttack Tarakasi Silver Filigree",
    "Certified Solitaire Diamonds",
    "Sone Pe Suhaga Gold Scheme",
    "Instant Cash for Gold Odisha",
  ],
  authors: [{ name: "Yashraj Jewellers", url: siteUrl }],
  creator: "Yashraj Jewellers",
  publisher: "Yashraj Jewellers",
  category: "Jewellery & Luxury Goods",
  applicationName: "Yashraj Jewellers",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Yashraj Jewellers",
    title: "Yashraj Jewellers | Instant Cash for Gold • Gold Wholesaler",
    description:
      "Sell gold for instant cash in 5 minutes at highest market rates. Direct gold wholesaler with minimal making charges and 100% BIS Hallmarked purity.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yashraj Jewellers - Instant Cash for Gold & Direct Wholesaler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Jewellers | Instant Cash for Gold • Direct Gold Wholesaler",
    description:
      "Sell old gold for instant cash in 5 minutes at Odisha's highest market rate. Direct jewellery wholesaler with minimal making charges.",
    images: ["/logo.png"],
    creator: "@yashraj_jewellers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["JewelryStore", "LocalBusiness"],
      "@id": `${siteUrl}/#store`,
      name: "Yashraj Jewellers",
      alternateName: "Yashraj Jewellers Odisha",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/logo.png`,
      description:
        "Odisha's premier gold bullion dealer, direct jewellery wholesaler, and certified BIS 916 hallmarked bridal jewellery showroom. Instant spot cash for old gold within 5 minutes.",
      telephone: "+91-7008343796",
      email: "yashrajjewellersbbsr@gmail.com",
      priceRange: "₹₹ - ₹₹₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking, IMPS, RTGS",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Station Square, Master Canteen",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.2648,
        longitude: 85.8415,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:30",
          closes: "21:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/yash.raj_jewellers/",
        "https://wa.me/917008343796",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Yashraj Jewellers Services & Collections",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Instant Cash for Old Gold in 5 Minutes",
              description:
                "Immediate spot cash or bank IMPS transfer for old/broken gold at highest bullion rate with 100% Karatmeter digital assay.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Direct Gold Jewellery Wholesaler",
              description:
                "Minimal making charges and direct wholesale rates on BIS 916 hallmarked bridal gold jewellery.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Old Gold Exchange & Upgrade",
              description:
                "Full weight-for-weight purity valuation with +3% bonus exchange value toward new jewellery.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Yashraj Jewellers",
      description: "Instant Cash for Gold • Gold Wholesaler • Best Jewellery in Odisha",
      publisher: {
        "@id": `${siteUrl}/#store`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/products?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
      className={`${playfair.variable} ${jakarta.variable} ${alexBrush.variable} ${cormorant.variable} ${cinzel.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#D4AF37]/20 selection:text-[#59420D]">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
