"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, PRODUCTS } from "../data/products";
import {
  isSupabaseConfigured,
  fetchProductsFromSupabase,
  saveProductToSupabase,
  updateProductInSupabase,
  deleteProductFromSupabase,
} from "../lib/supabase";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAppointmentOpen: boolean;
  setIsAppointmentOpen: (open: boolean) => void;
  isVideoCallOpen: boolean;
  setIsVideoCallOpen: (open: boolean) => void;
  enquireProduct: Product | null;
  setEnquireProduct: (product: Product | null) => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Products Inventory CRUD with Supabase
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetProductsToDefault: () => void;
  refreshProducts: () => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  isSupabaseReady: boolean;
  isLoadingProducts: boolean;

  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMetal: string;
  setSelectedMetal: (metal: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  
  scrollToProducts: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [enquireProduct, setEnquireProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products Inventory State (Initialized as empty to remove fake mock data)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [isSupabaseReady, setIsSupabaseReady] = useState<boolean>(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");

  // Load from Supabase and sync with localStorage on mount
  const syncProductsFromSupabase = useCallback(async () => {
    setIsLoadingProducts(true);
    const configured = isSupabaseConfigured();
    setIsSupabaseReady(configured);

    if (configured) {
      try {
        const dbProducts = await fetchProductsFromSupabase();
        if (dbProducts && Array.isArray(dbProducts)) {
          setProducts(dbProducts);
          try {
            localStorage.setItem("yj_products", JSON.stringify(dbProducts));
          } catch {}
          setIsLoadingProducts(false);
          return;
        }
      } catch (err) {
        console.error("Failed to load products from Supabase:", err);
      }
    }

    // Fallback to local storage (only real user-added products)
    try {
      const savedCustom = localStorage.getItem("yj_products");
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed)) {
          // Filter out old fake demo items that start with yj-gld-001, yj-dia-002, etc.
          const realItems = parsed.filter(
            (p: Product) => !p.id.match(/^yj-(gld|dia|slv|bln|brd)-\d{3}$/)
          );
          setProducts(realItems);
          localStorage.setItem("yj_products", JSON.stringify(realItems));
        }
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    }
    setIsLoadingProducts(false);
  }, []);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("yj_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("yj_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const token = localStorage.getItem("yj_admin_token");
      if (token === "yj_admin_authenticated_session_2026") {
        setIsAdminAuthenticated(true);
      }
    } catch {
      // ignore
    }

    syncProductsFromSupabase();
  }, [syncProductsFromSupabase]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("yj_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("yj_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, selectedSize: size || item.selectedSize }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size || "Standard" }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`Saved "${product.name}" to your wishlist.`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToProducts = () => {
    const el = document.getElementById("collection-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Products CRUD with Supabase integration
  const addProduct = async (newProduct: Product) => {
    // 1. Optimistic Local State Update
    setProducts((prev) => {
      const updated = [newProduct, ...prev.filter((p) => p.id !== newProduct.id)];
      try {
        localStorage.setItem("yj_products", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 2. Sync to Supabase if configured
    if (isSupabaseConfigured()) {
      const success = await saveProductToSupabase(newProduct);
      if (success) {
        showToast(`Masterpiece "${newProduct.name}" saved to Supabase.`);
      } else {
        showToast(`Saved locally. Supabase sync pending (check table permissions).`);
      }
    } else {
      showToast(`Masterpiece "${newProduct.name}" added to inventory.`);
    }
  };

  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    // 1. Optimistic Local State Update
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
      try {
        localStorage.setItem("yj_products", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 2. Sync to Supabase if configured
    if (isSupabaseConfigured()) {
      await updateProductInSupabase(id, updatedData);
    }
    showToast(`Product specifications updated.`);
  };

  const deleteProduct = async (id: string) => {
    // 1. Optimistic Local State Update
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem("yj_products", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 2. Sync to Supabase if configured
    if (isSupabaseConfigured()) {
      await deleteProductFromSupabase(id);
    }
    showToast(`Product removed from inventory.`);
  };

  const refreshProducts = async () => {
    await syncProductsFromSupabase();
    showToast("Products synchronized with Supabase database.");
  };

  const resetProductsToDefault = () => {
    setProducts([]);
    try {
      localStorage.removeItem("yj_products");
    } catch {}
    showToast("Inventory cleared.");
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find(
      (p) => p.id.toLowerCase() === id.toLowerCase() || p.code.toLowerCase() === id.toLowerCase()
    );
  };

  // Admin Auth Methods
  const adminLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Admin Credentials
    const isEmailValid =
      cleanEmail === "rajkhatua123@gmail.com" ||
      cleanEmail === "admin@yashrajjewellers.com" ||
      cleanEmail === "admin";
    const isPassValid =
      cleanPass === "rajkhatua123" ||
      cleanPass === "admin123" ||
      cleanPass === "yashraj2026";

    if (isEmailValid && isPassValid) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem("yj_admin_token", "yj_admin_authenticated_session_2026");
      } catch {}
      showToast("Welcome to Yashraj Jewellers Admin Portal.");
      return true;
    }
    showToast("Invalid credentials. Please verify your admin username and password.");
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem("yj_admin_token");
    } catch {}
    showToast("Admin session ended.");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAppointmentOpen,
        setIsAppointmentOpen,
        isVideoCallOpen,
        setIsVideoCallOpen,
        enquireProduct,
        setEnquireProduct,
        quickViewProduct,
        setQuickViewProduct,

        // Inventory & Supabase
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        refreshProducts,
        getProduct,
        isSupabaseReady,
        isLoadingProducts,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedMetal,
        setSelectedMetal,
        selectedOccasion,
        setSelectedOccasion,
        scrollToProducts,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D160E] text-[#F5E8CB] border border-[#C5A059]/40 px-5 py-3.5 rounded-lg shadow-2xl flex items-center space-x-3 text-sm animate-fade-in backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-ping" />
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
