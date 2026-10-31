import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductDetailClient from "./ProductDetailClient";
import { PRODUCTS, getProductById } from "../../data/products";
import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const params = PRODUCTS.map((product) => ({
    id: product.id,
  }));
  return params.length > 0 ? params : [{ id: "preview" }];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Jewellery Creation Not Found | Yashraj Jewellers",
      description: "The requested luxury jewellery item could not be located.",
    };
  }

  const primaryImage = product.images[0] || "/logo.png";

  return {
    title: `${product.name} (${product.purity}) | Yashraj Jewellers`,
    description: `${product.description} BIS 916 Hallmarked with HUID certification. Quoted at direct wholesale price ₹${product.price.toLocaleString("en-IN")}.`,
    keywords: [
      product.name,
      product.category,
      product.metal,
      product.purity,
      "Yashraj Jewellers",
      "Bhubaneswar Jewellery",
      "BIS 916 Hallmark",
      "Instant Cash for Gold",
    ],
    openGraph: {
      title: `${product.name} | Yashraj Jewellers Odisha`,
      description: product.description,
      images: [
        {
          url: primaryImage,
          width: 900,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] selection:bg-[#DFBA73]/30 text-[#1A130B]">
      <Navbar />
      <main className="flex-1">
        <ProductDetailClient product={product} productId={id} />
      </main>
      <Footer />
    </div>
  );
}
