import { categories } from "./categories";
import { placeholderImage } from "../utils/placeholder";

// [name, category, price, rating, badge]
// To use a real photo later, add  image: "/images/your-photo.jpg"  to a product.
const raw = [
  ["Rose Petal Gift Hamper", "gifts", 1499, 4.8, "BESTSELLER"],
  ["Personalised Photo Frame", "gifts", 699, 4.5, ""],
  ["Scented Candle Gift Set", "gifts", 999, 4.6, "NEW"],
  ["Plush Teddy Bear (60 cm)", "toys", 799, 4.7, "BESTSELLER"],
  ["Wooden Building Blocks", "toys", 499, 4.4, ""],
  ["Remote Control Car", "toys", 1499, 4.3, "SALE"],
  ["Royal Oud Eau de Parfum 100ml", "perfumes", 2499, 4.9, "NEW"],
  ["Fresh Floral Perfume 50ml", "perfumes", 999, 4.5, ""],
  ["Classic Leather Strap Watch", "watches", 2499, 4.6, "BESTSELLER"],
  ["Minimal Steel Wrist Watch", "watches", 1499, 4.4, ""],
  ["Vintage Wooden Wall Clock", "clocks", 1499, 4.7, ""],
  ["Modern Silent Wall Clock", "clocks", 699, 4.3, "SALE"],
  ["Insulated Steel Bottle 750ml", "bottles", 699, 4.6, "BESTSELLER"],
  ["Glass Water Bottle with Sleeve", "bottles", 499, 4.2, ""],
  ["Ceramic Coffee Mug", "mugs", 299, 4.5, ""],
  ["Gold-Rim Tea Cup Set of 6", "mugs", 999, 4.8, "NEW"],
  ["Crystal Wine Glass Set of 4", "glasses", 1499, 4.7, ""],
  ["Tumbler Glass Set of 6", "glasses", 499, 4.3, "SALE"],
  ["Stainless Steel Cutlery Set", "utensils", 999, 4.6, ""],
  ["Non-stick Cooking Spoon Set", "utensils", 299, 4.1, ""],
  ["Foldable Study Table", "tables", 2499, 4.4, "BESTSELLER"],
  ["Kids Study Desk with Storage", "tables", 2499, 4.5, "NEW"],
];

export const products = raw.map(([name, category, price, rating, badge], i) => {
  const cat = categories.find((c) => c.id === category);
  return {
    id: i + 1,
    name,
    category,
    price,
    rating,
    badge,
    inStock: true,
    description: `${name} — a quality pick from our ${cat.label.toLowerCase()} range. Ideal for gifting or everyday use. (Sample description — replace with real details.)`,
    image: placeholderImage(cat.emoji, cat.color),
  };
});
