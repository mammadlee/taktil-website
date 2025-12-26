import type { Express } from "express";
import type { Server } from "http";
import session from "express-session";
import pgSession from "connect-pg-simple";
import bcrypt from "bcryptjs";

import { storage } from "./storage";
import cloudinary from "./cloudinary";

import {
  insertProductSchema,
  insertContactSubmissionSchema,
  insertGallerySchema,
} from "@shared/schema";

/* =========================
   SESSION TYPES
========================= */
declare module "express-session" {
  interface SessionData {
    userId?: string;
    username?: string;
  }
}

/* =========================
   AUTH GUARD
========================= */
function requireAuth(req: any, res: any, next: any) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

/* =========================
   RATE LIMIT (simple MVP)
========================= */
function rateLimit({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (req: any, res: any, next: any) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const current = hits.get(key);

    if (!current || now > current.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (current.count >= max) {
      return res.status(429).json({ message: "Too many requests" });
    }

    current.count += 1;
    hits.set(key, current);
    next();
  };
}

/* =========================
   REGISTER ROUTES
========================= */
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  /* =========================
     SESSION SETUP
  ========================= */
  app.set("trust proxy", 1);

  const PgSession = pgSession(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "dev-secret",
      resave: false,
      saveUninitialized: false,
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        tableName: "session",
        createTableIfMissing: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // ← ƏSAS DƏYİŞİKLİK
        domain: process.env.NODE_ENV === "production" ? undefined : undefined,  // Cross-domain üçün
      }
    })
  );

  /* =========================
     AUTH
  ========================= */
  app.post(
    "/api/auth/login",
    rateLimit({ windowMs: 60_000, max: 10 }),
    async (req, res) => {
      const { username, password } = req.body;

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({ id: user.id, username: user.username });
    }
  );

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    res.json({
      id: req.session.userId,
      username: req.session.username,
    });
  });

  /* =========================
     CLOUDINARY SIGN
  ========================= */
  app.post("/api/uploads/sign", requireAuth, (_req, res) => {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "tactileone",
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "tactileone",
    });
  });

  /* =========================
     PRODUCTS
  ========================= */
  app.get("/api/products", async (_req, res) => {
    res.json(await storage.getAllProducts());
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post("/api/products", requireAuth, async (req, res) => {
    const data = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(data);
    res.status(201).json(product);
  });

  app.patch("/api/products/:id", requireAuth, async (req, res) => {
    const product = await storage.updateProduct(
      Number(req.params.id),
      req.body
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.json({ success: true });
  });

  /* =========================
     GALLERY (QALEREYA)
  ========================= */
  // Public (Home üçün)
  app.get("/api/gallery", async (_req, res) => {
    res.json(await storage.getAllGallery());
  });

  // Admin
  app.post("/api/gallery", requireAuth, async (req, res) => {
    const data = insertGallerySchema.parse(req.body);
    const item = await storage.createGallery(data);
    res.status(201).json(item);
  });

  app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
    const ok = await storage.deleteGallery(Number(req.params.id));
    res.json({ success: ok });
  });

  /* =========================
     CONTACT
  ========================= */
  app.post("/api/contact", async (req, res) => {
    const data = insertContactSubmissionSchema.parse(req.body);
    const submission = await storage.createContactSubmission(data);
    res.status(201).json(submission);
  });

  app.get("/api/contact", requireAuth, async (_req, res) => {
    res.json(await storage.getAllContactSubmissions());
  });

  return httpServer;
}
