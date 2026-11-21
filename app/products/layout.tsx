import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "100% BIS 916 Hallmarked Jewellery Catalogue | Wholesale Prices",
  description:
    "Explore authentic 22K gold chains, diamond solitaire rings, royal earrings, and certified tennis bracelets at direct wholesale rates at Yashraj Jewellers.",
  keywords: [
    "Gold Jewellery Catalogue",
    "22K Gold Chains",
    "Diamond Solitaire Rings",
    "Gold Earrings Jhumkas",
    "Diamond Tennis Bracelets",
    "BIS 916 Hallmark",
    "Yashraj Jewellers Products",
    "Wholesale Jewellery Bhubaneswar",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "100% BIS 916 Hallmarked Jewellery Catalogue | Yashraj Jewellers",
    description:
      "Explore handcrafted 22K gold chains, diamond rings, royal earrings, and elegant bracelets at direct wholesale prices.",
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

