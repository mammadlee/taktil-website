import type { Category, Product, Partner } from "@shared/schema";

const API_BASE = "/api";

// Categories
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Products
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Partners
export async function fetchPartners(): Promise<Partner[]> {
  const res = await fetch(`${API_BASE}/partners`);
  if (!res.ok) throw new Error("Failed to fetch partners");
  return res.json();
}

// Contact form
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
}

// Auth
export async function login(username: string, password: string): Promise<{ id: string; username: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Logout failed");
}

export async function getCurrentUser(): Promise<{ id: string; username: string } | null> {
  const res = await fetch(`${API_BASE}/auth/me`);
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
