import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

const fields = [
  ["name", "Full name", "text"], ["mobile", "Mobile number", "tel"], ["email", "Email", "email"],
  ["house", "House / Flat", "text"], ["street", "Street / Area", "text"], ["city", "City", "text"],
  ["state", "State", "text"], ["pincode", "Pincode", "text"],
];

export default function Checkout() {
  const { subtotal } = useCart();
  const [payment, setPayment] = useState("upi");
  const [done, setDone] = useState(false);
  const delivery = subtotal === 0 || subtotal >= site.freeDeliveryAbove ? 0 : site.deliveryCharge;

  if (done)
    return <div className="container page"><h1>Thank you!</h1><p>This is a demo checkout, so no order was placed and no payment was taken.</p><Link to="/" className="btn">Back to home</Link></div>;

  return (
    <div className="container page">
      <h1>Checkout</h1>
      <form className="checkout" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <div>
          <h2>Delivery details</h2>
          <div className="form-grid">
            {fields.map(([name, label, type]) => (
              <label key={name}>{label}<input name={name} type={type} required /></label>
            ))}
          </div>
          <h2>Payment method</h2>
          {[["upi", "UPI"], ["card", "Card"], ["cod", "Cash on Delivery"]].map(([v, l]) => (
            <label key={v} className="radio"><input type="radio" name="payment" checked={payment === v} onChange={() => setPayment(v)} /> {l}</label>
          ))}
          <small className="muted">Payments are not connected yet.</small>
        </div>
        <aside className="card summary">
          <h2>Order total</h2>
          <p><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
          <p><span>Delivery</span><span>{delivery ? formatPrice(delivery) : "Free"}</span></p>
          <p className="total"><span>Total</span><span>{formatPrice(subtotal + delivery)}</span></p>
          <button className="btn" type="submit">Place order (demo)</button>
        </aside>
      </form>
    </div>
  );
}
