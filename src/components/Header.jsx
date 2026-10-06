import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { site } from "../config/siteConfig";
import { useCart } from "../context/CartContext";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="icon-btn menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} />
        </button>
        <Link to="/" className="brand" onClick={close}>
          {site.logo ? <img src={site.logo} alt={site.name} height="36" /> : site.name}
        </Link>
        <nav className={"nav" + (open ? " open" : "")}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <Link to="/#categories" onClick={close}>Categories</Link>
        </nav>
        <div className="header-icons">
          <Link to="/shop" className="icon-btn" aria-label="Search products"><Icon name="search" /></Link>
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${count} items`}>
            <Icon name="cart" />
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
          <button className="icon-btn" aria-label="Account (coming soon)"><Icon name="user" /></button>
        </div>
      </div>
    </header>
  );
}
