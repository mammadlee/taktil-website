import { apiRequest } from "@/lib/queryClient";
import type {InsertProduct,  } from "@shared/schema";

export async function deleteCategory(id: number) {
  await apiRequest("DELETE", `/api/categories/${id}`);
}

/* ================== PRODUCT ================== */
export async function createProduct(data: InsertProduct) {
  const res = await apiRequest("POST", "/api/products", data);
  return res.json();
}
export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const res = await apiRequest("PATCH", `/api/products/${id}`, data);
  return res.json();
}
export async function deleteProduct(id: number) {
  await apiRequest("DELETE", `/api/products/${id}`);
}

export async function createGallery(data: { image: string }) {
  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create gallery");
  return res.json();
}


export async function deleteGallery(id: number) {
  const res = await fetch(`/api/gallery/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete image");
  return res.json();
}

// Mesajı silmək üçün API funksiyası
export async function deleteContactSubmission(id: number) {
  const res = await fetch(`/api/contact/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Mesaj silinərkən xəta baş verdi");
  return res.json();
}