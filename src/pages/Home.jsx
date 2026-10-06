import { Link } from "react-router-dom";
import { site } from "../config/siteConfig";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const benefits = [
  ["Wide range of products", "From toys to watches to study tables, all under one roof."],
  ["Quality products", "Every item is checked before it reaches you."],
  ["Easy online ordering", "Browse, add to cart and order in a few taps."],
  ["Trusted local store", "Visit us any day and see the products in person."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Make Every Moment Special</h1>
            <p>Discover gifts, toys, accessories and everyday essentials for every occasion.</p>
            <Link to="/shop" className="btn">SHOP NOW</Link>
          </div>
          {/* Replace this with a real photo later: <img src="/images/hero.jpg" alt="..." /> */}
          <div className="hero-art" role="img" aria-label="Gift placeholder">🎁</div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <h2>Shop by category</h2>
          <div className="grid grid-cat">
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?category=${c.id}`} className="cat-card" style={{ background: c.color }}>
                <span className="cat-emoji">{c.emoji}</span>{c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Featured products</h2>
          <div className="grid grid-products">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why shop with us</h2>
          <div className="grid grid-benefits">
            {benefits.map(([t, d]) => <div key={t} className="card benefit"><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container store">
          <div>
            <h2>Visit our store</h2>
            <p><strong>Address:</strong> {site.address}</p>
            <p><strong>Phone:</strong> {site.phone}</p>
            <p><strong>Opening hours:</strong> {site.hours}</p>
          </div>
          <div className="map">
            {site.mapEmbedUrl ? <iframe src={site.mapEmbedUrl} title="Store location" loading="lazy" /> : <span>Google Map goes here</span>}
          </div>
        </div>
      </section>

      <section className="section contact-band">
        <div className="container">
          <h2>Need help choosing a gift?</h2>
          <p>Message us and we'll help you pick the right one.</p>
          <a className="btn btn-gold" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
      </section>
    </>
  );
}
