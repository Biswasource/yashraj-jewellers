import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "100% BIS 916 Hallmarked Jewellery Catalogue | Wholesale Prices",
  description:
    "Explore authentic 22K & 24K gold necklaces, royal bangles, bridal chokers, certified diamond solitaires, and pure Cuttack silver filigree creations at direct wholesale rates at Yashraj Jewellers.",
  keywords: [
    "Gold Jewellery Catalogue",
    "BIS 916 Gold Necklaces",
    "22K Gold Bangles",
    "Bridal Jewellery Wholesale",
    "Diamond Solitaire Rings",
    "Silver Filigree Tarakasi",
    "Gold Coins 24K 999",
    "Yashraj Jewellers Products",
    "Wholesale Jewellery Bhubaneswar",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "100% BIS 916 Hallmarked Jewellery Catalogue | Yashraj Jewellers",
    description:
      "Explore handcrafted bridal jewellery, gold necklaces, bangles, diamond solitaires, and silver filigree at direct wholesale prices.",
    url: "/products",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yashraj Jewellers Catalogue",
      },
    ],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

