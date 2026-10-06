import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const priceRanges = {
  all: [0, Infinity], under500: [0, 499], "500to1000": [500, 1000], "1000to2000": [1001, 2000], above2000: [2001, Infinity],
};

export default function Shop() {
  // Filters live in the URL, so /shop?category=toys works from links
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "all";
  const price = params.get("price") || "all";
  const sort = params.get("sort") || "default";

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value && value !== "all" && value !== "default" ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const [min, max] = priceRanges[price] || priceRanges.all;
  let list = products.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) && (category === "all" || p.category === category) && p.price >= min && p.price <= max
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

  return (
    <div className="container page">
      <h1>Shop</h1>
      <div className="filters">
        <input type="search" placeholder="Search products" aria-label="Search products" value={q} onChange={(e) => update("q", e.target.value)} />
        <select aria-label="Category" value={category} onChange={(e) => update("category", e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <select aria-label="Price" value={price} onChange={(e) => update("price", e.target.value)}>
          <option value="all">Any price</option><option value="under500">Under ₹500</option><option value="500to1000">₹500 – ₹1,000</option>
          <option value="1000to2000">₹1,000 – ₹2,000</option><option value="above2000">Above ₹2,000</option>
        </select>
        <select aria-label="Sort" value={sort} onChange={(e) => update("sort", e.target.value)}>
          <option value="default">Featured</option><option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option><option value="rating">Top rated</option>
        </select>
      </div>
      <p className="muted">{list.length} products</p>
      {list.length ? (
        <div className="grid grid-products">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <p>No products match your search. Try a different word or clear the filters.</p>
      )}
    </div>
  );
}
