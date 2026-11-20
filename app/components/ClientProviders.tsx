"use client";

import React, { Suspense } from "react";
import { StoreProvider } from "../context/StoreContext";
import ProductDetailModal from "./ProductDetailModal";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import AppointmentModal from "./AppointmentModal";
import EnquiryModal from "./EnquiryModal";
import SmoothScroll from "./SmoothScroll";
import GlobalNavigationLoader from "./GlobalNavigationLoader";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Suspense fallback={null}>
        <GlobalNavigationLoader />
      </Suspense>
      <SmoothScroll>
        {children}
        <ProductDetailModal />
        <EnquiryModal />
        <CartDrawer />
        <WishlistDrawer />
        <AppointmentModal />
      </SmoothScroll>
    </StoreProvider>
  );
}
