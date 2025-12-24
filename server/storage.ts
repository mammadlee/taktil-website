import "dotenv/config";
import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type ContactSubmission,
  type InsertContactSubmission,
  type Gallery,
  type InsertGallery,
  users,
  products,
  contactSubmissions,
  gallery,
} from "@shared/schema";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq } from "drizzle-orm";

const { Pool } = pg;

/* =========================
   STORAGE INTERFACE
========================= */
export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(
    id: number,
    product: Partial<InsertProduct>
  ): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Gallery
  getAllGallery(): Promise<Gallery[]>;
  createGallery(item: InsertGallery): Promise<Gallery>;
  deleteGallery(id: number): Promise<boolean>;

  // Contact
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission>;
}

/* =========================
   DATABASE STORAGE
========================= */
export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // 🔴 NEON + RAILWAY ÜÇÜN MÜTLƏQDİR
      },
    });

    this.db = drizzle(pool);
  }

  /* =========================
     USERS
  ========================= */
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  /* =========================
     PRODUCTS
  ========================= */
  async getAllProducts(): Promise<Product[]> {
    return await this.db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await this.db
      .insert(products)
      .values(product)
      .returning();
    return result[0];
  }

  async updateProduct(
    id: number,
    product: Partial<InsertProduct>
  ): Promise<Product | undefined> {
    const result = await this.db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return result.length > 0;
  }

  /* =========================
     GALLERY
  ========================= */
  async getAllGallery(): Promise<Gallery[]> {
    return await this.db.select().from(gallery);
  }

  async createGallery(item: InsertGallery): Promise<Gallery> {
    const result = await this.db
      .insert(gallery)
      .values(item)
      .returning();
    return result[0];
  }

  async deleteGallery(id: number): Promise<boolean> {
    const result = await this.db
      .delete(gallery)
      .where(eq(gallery.id, id))
      .returning();
    return result.length > 0;
  }

  /* =========================
     CONTACT SUBMISSIONS
  ========================= */
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions);
  }

  async createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const result = await this.db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return result[0];
  }
}

/* =========================
   EXPORT SINGLETON
========================= */
export const storage = new DatabaseStorage();
