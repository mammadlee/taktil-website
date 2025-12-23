import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  serial,
  numeric,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* =========================
   USERS
========================= */
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

/* =========================
   PRODUCTS (CATEGORY INSIDE)
========================= */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  // ✅ Category is now a simple string
  category: text("category").notNull(),

  description: text("description").notNull(),

  // Cloudinary image URL
  image: text("image").notNull(),
});

/* =========================
   GALLERY
========================= */
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
});

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;


/* =========================
   CONTACT SUBMISSIONS
========================= */
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

/* =========================
   ZOD INSERT SCHEMAS
========================= */
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});


export const insertContactSubmissionSchema =
  createInsertSchema(contactSubmissions).omit({
    id: true,
    createdAt: true,
  });

/* =========================
   TYPES
========================= */
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertContactSubmission =
  z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission =
  typeof contactSubmissions.$inferSelect;
