import { storage } from "./storage";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await storage.createUser({
    username: "admin",
    password: hashedPassword,
  });
  console.log("✅ Admin user created (username: admin, password: admin123)");

  // Create categories with image paths
  const categoriesData = [
    {
      name: "Tactile Maps",
      description: "Custom 3D printed maps for campuses, buildings, and public spaces.",
      image: "/generated_images/tactile_floor_map_product.png",
    },
    {
      name: "Braille Signage",
      description: "ADA compliant room signs, wayfinding, and regulatory signage.",
      image: "/generated_images/braille_room_signage.png",
    },
    {
      name: "Tactile Floor Indicators",
      description: "Safety paving and directional indicators for indoor and outdoor use.",
      image: "/generated_images/tactile_paving_floor_indicators.png",
    },
    {
      name: "Educational Tools",
      description: "Learning materials and toys designed for visually impaired students.",
      image: "/generated_images/braille_educational_blocks.png",
    },
    {
      name: "Accessibility Tools",
      description: "White canes, magnifiers, and daily living aids.",
      image: "/generated_images/close_up_of_hand_reading_braille.png",
    }
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const category = await storage.createCategory(cat);
    createdCategories.push(category);
  }
  console.log(`✅ Created ${createdCategories.length} categories`);

  // Create products
  const productsData = [
    {
      name: "University Campus Tactile Map",
      categoryId: createdCategories[0].id,
      price: "$1,200",
      description: "A detailed 3D map of a university campus featuring raised buildings, paths, and braille labels. Durable and high-contrast.",
      image: "/generated_images/tactile_floor_map_product.png",
    },
    {
      name: "Standard Conference Room Sign",
      categoryId: createdCategories[1].id,
      price: "$45",
      description: "Matte finish room sign with Grade 2 Braille and raised lettering. Available in multiple high-contrast color combinations.",
      image: "/generated_images/braille_room_signage.png",
    },
    {
      name: "Safety Yellow Tactile Paving",
      categoryId: createdCategories[2].id,
      price: "$25 / tile",
      description: "Durable polyurethane tactile paving tiles for warning of hazards like stairs or platform edges. Anti-slip surface.",
      image: "/generated_images/tactile_paving_floor_indicators.png",
    },
    {
      name: "Wooden Braille Alphabet Blocks",
      categoryId: createdCategories[3].id,
      price: "$35",
      description: "Set of 26 smooth wooden blocks with engraved letters and corresponding raised braille dots. Safe for children.",
      image: "/generated_images/braille_educational_blocks.png",
    },
    {
      name: "Custom Wayfinding Kiosk",
      categoryId: createdCategories[0].id,
      price: "$2,500",
      description: "Interactive tactile kiosk with audio feedback options. Perfect for lobby entrances.",
      image: "/generated_images/tactile_floor_map_product.png",
    },
    {
      name: "Restroom Identification Sign",
      categoryId: createdCategories[1].id,
      price: "$40",
      description: "Universal restroom symbol with braille. Triangle/Circle geometry for non-visual identification.",
      image: "/generated_images/braille_room_signage.png",
    }
  ];

  for (const prod of productsData) {
    await storage.createProduct(prod);
  }
  console.log(`✅ Created ${productsData.length} products`);

  // Create partners
  const partnersData = [
    { name: "VisionFirst NGO", type: "Research Partner" },
    { name: "Global Access Tech", type: "Technology Provider" },
    { name: "City Planning Dept", type: "Municipal Client" },
    { name: "EduBlind Foundation", type: "Educational Grant" },
    { name: "SafePath Systems", type: "Safety Certification" },
  ];

  for (const partner of partnersData) {
    await storage.createPartner(partner);
  }
  console.log(`✅ Created ${partnersData.length} partners`);

  console.log("🎉 Database seeded successfully!");
}

seed().catch(console.error);
