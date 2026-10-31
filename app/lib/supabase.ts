import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Product } from "../data/products";

// Fallback placeholder credentials for initial build safety
const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const DEFAULT_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Storage keys for browser-configured credentials
const STORAGE_SUPABASE_URL_KEY = "yj_supabase_url";
const STORAGE_SUPABASE_ANON_KEY = "yj_supabase_anon_key";

/**
 * Returns active Supabase credentials (from environment or browser storage)
 */
export function getSupabaseCredentials(): { url: string; anonKey: string } {
  if (typeof window !== "undefined") {
    const savedUrl = localStorage.getItem(STORAGE_SUPABASE_URL_KEY);
    const savedKey = localStorage.getItem(STORAGE_SUPABASE_ANON_KEY);
    if (savedUrl && savedKey) {
      return { url: savedUrl, anonKey: savedKey };
    }
  }
  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY,
  };
}

/**
 * Save custom Supabase credentials in browser storage
 */
export function saveSupabaseCredentials(url: string, anonKey: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_SUPABASE_URL_KEY, url.trim());
    localStorage.setItem(STORAGE_SUPABASE_ANON_KEY, anonKey.trim());
    _cachedClient = null; // Reset cached client
  }
}

/**
 * Clear custom Supabase credentials
 */
export function clearSupabaseCredentials(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_SUPABASE_URL_KEY);
    localStorage.removeItem(STORAGE_SUPABASE_ANON_KEY);
    _cachedClient = null;
  }
}

let _cachedClient: SupabaseClient | null = null;

/**
 * Get initialized Supabase client instance
 */
export function getSupabase(): SupabaseClient | null {
  if (_cachedClient) return _cachedClient;

  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey || !url.startsWith("http")) {
    return null;
  }

  try {
    _cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return _cachedClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Check if Supabase client is properly configured with credentials
 */
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(url && anonKey && url.startsWith("http") && anonKey.length > 10);
}

// ============================================================================
// DATA MAPPING UTILITIES
// ============================================================================

/**
 * Convert frontend Product to database row (snake_case)
 */
export function productToDb(product: Product): Record<string, any> {
  return {
    id: product.id,
    name: product.name,
    code: product.code,
    category: product.category,
    metal: product.metal,
    purity: product.purity,
    price: Number(product.price),
    original_price: Number(product.originalPrice),
    gross_weight: Number(product.grossWeight),
    net_gold_weight: Number(product.netGoldWeight),
    making_charges: Number(product.makingCharges || 0),
    gst: Number(product.gst || 0),
    stone_weight: product.stoneWeight || null,
    tag: product.tag || null,
    gender: product.gender || "women",
    occasion: product.occasion || "all",
    rating: Number(product.rating || 5.0),
    reviews_count: Number(product.reviewsCount || 1),
    in_stock: Boolean(product.inStock),
    images: Array.isArray(product.images) ? product.images : [],
    description: product.description || "",
    certification: product.certification || "Certified Authentic",
  };
}

/**
 * Convert database row to frontend Product (camelCase)
 */
export function dbToProduct(row: Record<string, any>): Product {
  return {
    id: String(row.id),
    name: String(row.name || "Untitled Creation"),
    code: String(row.code || `YJ-${Date.now()}`),
    category: (row.category || "necklaces") as Product["category"],
    metal: (row.metal || "gold") as Product["metal"],
    purity: (row.purity || "22KT (916 BIS)") as Product["purity"],
    gender: (row.gender || "women") as Product["gender"],
    occasion: (row.occasion || "wedding") as Product["occasion"],
    price: Number(row.price || 0),
    originalPrice: Number(row.original_price || row.price || 0),
    grossWeight: Number(row.gross_weight || 0),
    netGoldWeight: Number(row.net_gold_weight || 0),
    stoneWeight: row.stone_weight ? String(row.stone_weight) : undefined,
    makingCharges: Number(row.making_charges || 0),
    gst: Number(row.gst || 0),
    tag: row.tag ? (row.tag as Product["tag"]) : undefined,
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 1),
    inStock: Boolean(row.in_stock ?? true),
    description: String(row.description || ""),
    images: Array.isArray(row.images) && row.images.length > 0
      ? row.images
      : ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"],
    certification: String(row.certification || "Certified Authentic"),
  };
}

// ============================================================================
// SUPABASE CRUD OPERATIONS
// ============================================================================

/**
 * Fetch all products from Supabase products table
 */
export async function fetchProductsFromSupabase(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error:", error.message);
      return [];
    }

    if (data && Array.isArray(data)) {
      return data.map(dbToProduct);
    }
    return [];
  } catch (err) {
    console.error("Failed to query Supabase products:", err);
    return [];
  }
}

/**
 * Insert or update a product in Supabase
 */
export async function saveProductToSupabase(product: Product): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const dbRow = productToDb(product);
    const { error } = await supabase.from("products").upsert(dbRow, { onConflict: "id" });

    if (error) {
      console.error("Supabase upsert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to save product to Supabase:", err);
    return false;
  }
}

/**
 * Update partial product in Supabase
 */
export async function updateProductInSupabase(
  id: string,
  updates: Partial<Product>
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const dbUpdates: Record<string, any> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.code !== undefined) dbUpdates.code = updates.code;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.metal !== undefined) dbUpdates.metal = updates.metal;
    if (updates.purity !== undefined) dbUpdates.purity = updates.purity;
    if (updates.price !== undefined) dbUpdates.price = Number(updates.price);
    if (updates.originalPrice !== undefined) dbUpdates.original_price = Number(updates.originalPrice);
    if (updates.grossWeight !== undefined) dbUpdates.gross_weight = Number(updates.grossWeight);
    if (updates.netGoldWeight !== undefined) dbUpdates.net_gold_weight = Number(updates.netGoldWeight);
    if (updates.makingCharges !== undefined) dbUpdates.making_charges = Number(updates.makingCharges);
    if (updates.gst !== undefined) dbUpdates.gst = Number(updates.gst);
    if (updates.inStock !== undefined) dbUpdates.in_stock = Boolean(updates.inStock);
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.certification !== undefined) dbUpdates.certification = updates.certification;

    const { error } = await supabase.from("products").update(dbUpdates).eq("id", id);
    if (error) {
      console.error("Supabase update error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update product in Supabase:", err);
    return false;
  }
}

/**
 * Delete product from Supabase
 */
export async function deleteProductFromSupabase(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Supabase delete error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete product from Supabase:", err);
    return false;
  }
}

/**
 * Test Supabase connectivity
 */
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  count?: number;
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      success: false,
      message: "Supabase URL and Anon Key not configured yet.",
    };
  }

  try {
    const { data, count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) {
      return {
        success: false,
        message: `Database error: ${error.message} (Make sure the 'products' table is created).`,
      };
    }

    return {
      success: true,
      message: `Successfully connected to Supabase! Found ${count ?? 0} product(s) in database.`,
      count: count ?? 0,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err.message || "Unknown error"}`,
    };
  }
}
