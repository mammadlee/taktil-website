import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // process.cwd() tətbiqin başladığı ana qovluğu göstərir. 
  // Railway və build prosesi üçün ən stabil yol budur.
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  // Əgər dist/public yoxdursa (lokal inkişaf zamanı), kök public-ə baxır
  const publicPath = fs.existsSync(distPath) ? distPath : path.resolve(process.cwd(), "public");

  if (!fs.existsSync(publicPath) && process.env.NODE_ENV === "production") {
    throw new Error(
      `Statik build qovluğu tapılmadı: ${publicPath}. Zəhmət olmasa əvvəlcə 'npm run build' edin.`
    );
  }

  app.use(express.static(publicPath));

  // SPA (Single Page Application) marşrutlaşdırması üçün vacibdir
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Frontend build tapılmadı (index.html)");
    }
  });
}