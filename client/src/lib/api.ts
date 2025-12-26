import type { Product, ContactSubmission } from "@shared/schema";
import { getApiUrl } from "./apiConfig";

// Products
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(getApiUrl("/api/products"), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Contact form (public submit)
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const res = await fetch(getApiUrl("/api/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
}

// Contact submissions (admin inbox)
export async function fetchContactSubmissions(): Promise<ContactSubmission[]> {
  const res = await fetch(getApiUrl("/api/contact"), { credentials: "include" });
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to fetch contact submissions");
  return res.json();
}

// Auth
export async function login(
  username: string,
  password: string
): Promise<{ id: string; username: string }> {
  const res = await fetch(getApiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }
  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch(getApiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
}

export async function getCurrentUser(): Promise<{ id: string; username: string } | null> {
  const res = await fetch(getApiUrl("/api/auth/me"), { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}