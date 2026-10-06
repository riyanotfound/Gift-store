import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { formatPrice } from "../utils/format";
import Icon from "../components/Icon";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const p = products.find((x) => x.id === Number(id));

  if (!p) return <div className="container page"><h1>Product not found</h1><Link to="/shop" className="btn">Back to shop</Link></div>;
  const liked = wishlist.includes(p.id);

  return (
    <div className="container page details">
      <img className="details-img" src={p.image} alt={p.name} />
      <div>
        <p className="muted">{categories.find((c) => c.id === p.category)?.label}</p>
        <h1>{p.name}</h1>
        <p className="rating">★ {p.rating} rating</p>
        <p className="price">{formatPrice(p.price)}</p>
        <p className={p.inStock ? "in-stock" : "out-stock"}>{p.inStock ? "In stock" : "Out of stock"}</p>
        <p>{p.description}</p>
        <div className="qty" aria-label="Quantity">
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
        </div>
        <div className="actions">
          <button className="btn btn-outline" onClick={() => addToCart(p.id, qty)}>Add to cart</button>
          <button className="btn" onClick={() => { addToCart(p.id, qty); navigate("/cart"); }}>Buy now</button>
          <button className={"wish wish-static" + (liked ? " active" : "")} aria-pressed={liked} aria-label="Toggle wishlist" onClick={() => toggleWishlist(p.id)}>
            <Icon name="heart" filled={liked} />
          </button>
        </div>
      </div>
    </div>
  );
}
