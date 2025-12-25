import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

// CORS konfiqurasiyası - frontend-dən gələn sorğular üçün
app.use(cors({
  origin: ['https://taktil.az', 'https://www.taktil.az', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Log middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

(async () => {
  const server = await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Daxili Server Xətası";
    res.status(status).json({ message });
  });

  // Yalnız SERVE_FRONTEND=true olduqda frontend serve et
  if (process.env.NODE_ENV === "production" && process.env.SERVE_FRONTEND === "true") {
    log("Frontend static faylları serve edilir");
    serveStatic(app);
  } else if (process.env.NODE_ENV !== "production") {
    log("Development mode - Vite dev server işləyir");
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    log("API-only mode - Frontend serve edilmir");
  }

  // Railway üçün PORT 0.0.0.0 hostunda dinlənilməlidir
  const PORT = Number(process.env.PORT) || 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server ${PORT} portunda (0.0.0.0) işə düşdü`);
    log(`Environment: ${process.env.NODE_ENV}`);
    log(`SERVE_FRONTEND: ${process.env.SERVE_FRONTEND}`);
  });
})();