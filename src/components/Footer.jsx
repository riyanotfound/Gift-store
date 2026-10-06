import { Link } from "react-router-dom";
import { site } from "../config/siteConfig";
import { categories } from "../data/categories";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="brand">{site.name}</h3>
          <p>Gifts, toys and everyday essentials for every occasion.</p>
          <p>Instagram · Facebook · YouTube <small>(placeholders)</small></p>
        </div>
        <div>
          <h4>Quick links</h4>
          <Link to="/">Home</Link><Link to="/shop">Shop</Link><Link to="/cart">Cart</Link><Link to="/checkout">Checkout</Link>
        </div>
        <div>
          <h4>Categories</h4>
          {categories.slice(0, 6).map((c) => <Link key={c.id} to={`/shop?category=${c.id}`}>{c.label}</Link>)}
        </div>
        <div>
          <h4>Contact</h4>
          <p>{site.address}</p><p>{site.phone}</p><p>{site.email}</p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
