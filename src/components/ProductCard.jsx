import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { categories } from "../data/categories";
import { formatPrice } from "../utils/format";
import Icon from "./Icon";

export default function ProductCard({ product: p }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const liked = wishlist.includes(p.id);
  return (
    <article className="card product-card">
      <div className="product-img">
        <Link to={`/product/${p.id}`}><img src={p.image} alt={p.name} loading="lazy" /></Link>
        {p.badge && <span className={"badge badge-" + p.badge.toLowerCase()}>{p.badge}</span>}
        <button className={"wish" + (liked ? " active" : "")} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={liked} onClick={() => toggleWishlist(p.id)}>
          <Icon name="heart" size={20} filled={liked} />
        </button>
      </div>
      <div className="product-info">
        <small>{categories.find((c) => c.id === p.category)?.label}</small>
        <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        <p className="rating">★ {p.rating}</p>
        <div className="product-bottom">
          <strong>{formatPrice(p.price)}</strong>
          <button className="btn btn-small" onClick={() => addToCart(p.id)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
