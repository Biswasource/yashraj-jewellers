import { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES, METALS } from "./data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yashrajjewellers.com";
  const now = new Date();

  // Static core routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/exchange-buyback-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-of-billing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category routes
  CATEGORIES.forEach((cat) => {
    if (cat.id !== "all") {
      routes.push({
        url: `${baseUrl}/products?category=${cat.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  });

  // Metal routes
  METALS.forEach((metal) => {
    if (metal.id !== "all") {
      routes.push({
        url: `${baseUrl}/products?metal=${metal.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  });

  // Dynamic Product details
  PRODUCTS.forEach((product) => {
    routes.push({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return routes;
}

