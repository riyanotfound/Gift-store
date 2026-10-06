import { createContext, useContext, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, qty }]
  const [wishlist, setWishlist] = useState([]); // [productId]

  const addToCart = (id, qty = 1) =>
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id, qty }]
    );
  const setQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartLines = items.map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty }));
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = cartLines.reduce((sum, l) => sum + l.price * l.qty, 0);

  return (
    <CartContext.Provider value={{ cartLines, count, subtotal, wishlist, addToCart, setQty, removeFromCart, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
}
