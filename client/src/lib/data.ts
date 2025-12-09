import heroImage from "@assets/generated_images/close_up_of_hand_reading_braille.png";
import mapImage from "@assets/generated_images/tactile_floor_map_product.png";
import signImage from "@assets/generated_images/braille_room_signage.png";
import floorImage from "@assets/generated_images/tactile_paving_floor_indicators.png";
import blockImage from "@assets/generated_images/braille_educational_blocks.png";

export const categories = [
  {
    id: "maps",
    name: "Tactile Maps",
    description: "Custom 3D printed maps for campuses, buildings, and public spaces.",
    image: mapImage,
  },
  {
    id: "signage",
    name: "Braille Signage",
    description: "ADA compliant room signs, wayfinding, and regulatory signage.",
    image: signImage,
  },
  {
    id: "floor",
    name: "Tactile Floor Indicators",
    description: "Safety paving and directional indicators for indoor and outdoor use.",
    image: floorImage,
  },
  {
    id: "education",
    name: "Educational Tools",
    description: "Learning materials and toys designed for visually impaired students.",
    image: blockImage,
  },
  {
    id: "tools",
    name: "Accessibility Tools",
    description: "White canes, magnifiers, and daily living aids.",
    image: heroImage, 
  }
];

export const products = [
  {
    id: 1,
    name: "University Campus Tactile Map",
    category: "maps",
    price: "$1,200",
    description: "A detailed 3D map of a university campus featuring raised buildings, paths, and braille labels. Durable and high-contrast.",
    image: mapImage,
  },
  {
    id: 2,
    name: "Standard Conference Room Sign",
    category: "signage",
    price: "$45",
    description: "Matte finish room sign with Grade 2 Braille and raised lettering. Available in multiple high-contrast color combinations.",
    image: signImage,
  },
  {
    id: 3,
    name: "Safety Yellow Tactile Paving",
    category: "floor",
    price: "$25 / tile",
    description: "Durable polyurethane tactile paving tiles for warning of hazards like stairs or platform edges. Anti-slip surface.",
    image: floorImage,
  },
  {
    id: 4,
    name: "Wooden Braille Alphabet Blocks",
    category: "education",
    price: "$35",
    description: "Set of 26 smooth wooden blocks with engraved letters and corresponding raised braille dots. Safe for children.",
    image: blockImage,
  },
  {
    id: 5,
    name: "Custom Wayfinding Kiosk",
    category: "maps",
    price: "$2,500",
    description: "Interactive tactile kiosk with audio feedback options. Perfect for lobby entrances.",
    image: mapImage,
  },
  {
    id: 6,
    name: "Restroom Identification Sign",
    category: "signage",
    price: "$40",
    description: "Universal restroom symbol with braille. Triangle/Circle geometry for non-visual identification.",
    image: signImage,
  }
];

export const partners = [
  { name: "VisionFirst NGO", type: "Research Partner" },
  { name: "Global Access Tech", type: "Technology Provider" },
  { name: "City Planning Dept", type: "Municipal Client" },
  { name: "EduBlind Foundation", type: "Educational Grant" },
  { name: "SafePath Systems", type: "Safety Certification" },
];
