import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts, fetchPartners } from "./api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
  });
}
