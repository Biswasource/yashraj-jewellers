"use client";

import React from "react";
import { StoreProvider } from "../context/StoreContext";
import ProductDetailModal from "./ProductDetailModal";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import AppointmentModal from "./AppointmentModal";
import EnquiryModal from "./EnquiryModal";
import SmoothScroll from "./SmoothScroll";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
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
