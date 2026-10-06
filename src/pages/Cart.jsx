import { Link } from "react-router-dom";
import { site } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const { cartLines, subtotal, setQty, removeFromCart } = useCart();
  const delivery = subtotal === 0 || subtotal >= site.freeDeliveryAbove ? 0 : site.deliveryCharge;

  if (!cartLines.length)
    return <div className="container page"><h1>Your cart is empty</h1><p>Add something you like and it will show up here.</p><Link to="/shop" className="btn">Browse products</Link></div>;

  return (
    <div className="container page cart">
      <div>
        <h1>Your cart</h1>
        {cartLines.map((l) => (
          <div key={l.id} className="cart-row">
            <img src={l.image} alt={l.name} />
            <div className="cart-name">
              <Link to={`/product/${l.id}`}>{l.name}</Link>
              <small>{formatPrice(l.price)} each</small>
              <button className="link-btn" onClick={() => removeFromCart(l.id)}>Remove</button>
            </div>
            <div className="qty">
              <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease quantity">−</button>
              <span>{l.qty}</span>
              <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <strong>{formatPrice(l.price * l.qty)}</strong>
          </div>
        ))}
      </div>
      <aside className="card summary">
        <h2>Order summary</h2>
        <p><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
        <p><span>Delivery</span><span>{delivery ? formatPrice(delivery) : "Free"}</span></p>
        <p className="total"><span>Total</span><span>{formatPrice(subtotal + delivery)}</span></p>
        <small>Delivery charge is a placeholder. Edit it in siteConfig.js.</small>
        <Link to="/checkout" className="btn">Proceed to checkout</Link>
      </aside>
    </div>
  );
}
