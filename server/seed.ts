import "dotenv/config";
import bcrypt from "bcryptjs";
import { storage } from "./storage";


async function seed() {
  const admin = await storage.getUserByUsername("admin");

  if (!admin) {
    const hashed = await bcrypt.hash("admin123", 10);
    await storage.createUser({
      username: "admin",
      password: hashed,
    });
    console.log("✅ Admin created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
