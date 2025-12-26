import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchContactSubmissions,
} from "./api";
import type { Gallery } from "@shared/schema";
import { getApiUrl } from "./apiConfig";


/* =========================
   PRODUCTS
========================= */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

/* =========================
   CATEGORIES
========================= */
export function useCategories() {
  return useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const res = await fetch(getApiUrl("/api/categories"));
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });
}

/* =========================
   CONTACT (ADMIN)
========================= */
export function useContactSubmissions() {
  return useQuery({
    queryKey: ["contactSubmissions"],
    queryFn: fetchContactSubmissions,
  });
}

/* =========================
   GALLERY
========================= */
export function useGallery() {
  return useQuery<Gallery[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await fetch(getApiUrl("/api/gallery"));
      if (!res.ok) {
        throw new Error("Failed to fetch gallery");
      }
      return res.json();
    },
  });
}