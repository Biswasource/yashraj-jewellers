"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductPageLoader from "./ProductPageLoader";
import { useStore } from "../context/StoreContext";

export default function GlobalNavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSaving, savingMessage } = useStore();

  const [isNavigating, setIsNavigating] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show smooth luxury transition on route change
    setIsNavigating(true);
    setIsFading(false);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      const hideTimer = setTimeout(() => {
        setIsNavigating(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }, 450);

    return () => clearTimeout(fadeTimer);
  }, [pathname, searchParams]);

  // Priority 1: Cloud/Database Saving Actions across the app
  if (isSaving) {
    return <ProductPageLoader message={savingMessage || "Saving Creation to Cloud..."} />;
  }

  // Priority 2: Page Route Transition (Skip product detail pages because ProductDetailClient manages its own custom hydration & Supabase data resolution)
  const isProductDetailPage = pathname?.startsWith("/products/") && pathname !== "/products";

  if (isNavigating && !isProductDetailPage) {
    return (
      <ProductPageLoader
        message="Loading Yashraj Jewellers..."
        isFading={isFading}
      />
    );
  }

  return null;
}

