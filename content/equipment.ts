import type { EquipmentProduct } from "./types";

export const equipmentCategories = [
  { title: "Keyboards", text: "Performance and workstation keyboards for learning, writing and playing." },
  { title: "Digital pianos", text: "Weighted-action digital pianos for practice and performance." },
  { title: "MIDI controllers", text: "Keys, pads and controllers for producing in your DAW." },
  { title: "Studio monitors", text: "Accurate speakers for making better mixing decisions." },
  { title: "Headphones", text: "Closed and open-back headphones for tracking and mixing." },
  { title: "Microphones", text: "Condenser and dynamic microphones for vocals and instruments." },
  { title: "Audio interfaces", text: "Get clean, reliable audio in and out of your computer." },
  { title: "Recording accessories", text: "Stands, cables, pop filters and the essentials around them." },
  { title: "Music production equipment", text: "The tools that complete a home or project studio." },
];

/**
 * Curated products from the retail partner. Add ONLY genuine products with their real name,
 * a permitted image and the real product-page URL. No prices or availability are shown.
 */
export const equipmentProducts: EquipmentProduct[] = [];
