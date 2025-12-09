import { 
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type Partner,
  type InsertPartner,
  type ContactSubmission,
  type InsertContactSubmission,
  users,
  categories,
  products,
  partners,
  contactSubmissions
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq } from "drizzle-orm";

const { Pool } = pg;

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Partner methods
  getAllPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: number): Promise<boolean>;

  // Contact submission methods
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return await this.db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await this.db.update(categories).set(category).where(eq(categories.id, id)).returning();
    return result[0];
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.db.delete(categories).where(eq(categories.id, id)).returning();
    return result.length > 0;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await this.db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await this.db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // Partner methods
  async getAllPartners(): Promise<Partner[]> {
    return await this.db.select().from(partners);
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const result = await this.db.insert(partners).values(partner).returning();
    return result[0];
  }

  async updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    const result = await this.db.update(partners).set(partner).where(eq(partners.id, id)).returning();
    return result[0];
  }

  async deletePartner(id: number): Promise<boolean> {
    const result = await this.db.delete(partners).where(eq(partners.id, id)).returning();
    return result.length > 0;
  }

  // Contact submission methods
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await this.db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
