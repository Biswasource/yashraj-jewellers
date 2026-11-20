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
      title: "Luxury Jewellery Piece | Yashraj Jewellers",
      description: "Explore 100% BIS 916 hallmarked authentic jewellery creations at Yashraj Jewellers.",
    };
  }

  const primaryImage = product.images[0] || "/logo.png";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yashrajjewellers.com";

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
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: `${product.name} | Yashraj Jewellers Odisha`,
      description: product.description,
      url: `/products/${id}`,
      images: [
        {
          url: primaryImage,
          width: 900,
          height: 900,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Yashraj Jewellers`,
      description: product.description,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yashrajjewellers.com";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images && product.images.length > 0 ? product.images : [`${siteUrl}/logo.png`],
        description: product.description,
        sku: product.code,
        mpn: product.id,
        brand: {
          "@type": "Brand",
          name: "Yashraj Jewellers",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/products/${product.id}`,
          priceCurrency: "INR",
          price: product.price,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Yashraj Jewellers",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating || 5.0,
          reviewCount: product.reviewsCount || 18,
        },
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] selection:bg-[#DFBA73]/30 text-[#1A130B]">
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <Navbar />
      <main className="flex-1">
        <ProductDetailClient product={product} productId={id} />
      </main>
      <Footer />
    </div>
  );
}
