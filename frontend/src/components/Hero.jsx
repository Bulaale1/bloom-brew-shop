export default function Hero({ onShopNow }) {
  return (
    <section className="hero" aria-label="Welcome to Bloom & Brew">
      <div className="hero__content">
        <p className="hero__eyebrow">Freshly brewed, lovingly made</p>
        <h1 className="hero__title">
          Your Perfect Cup<br />Awaits You
        </h1>
        <p className="hero__subtitle">
          Handcrafted coffees, indulgent desserts, and revitalizing smoothies —
          all made with the finest ingredients and a whole lot of love.
        </p>
        <div className="hero__actions">
          <button className="hero__cta" onClick={onShopNow}>
            Browse Menu
          </button>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">30+</span>
              <span className="hero__stat-label">Menu Items</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">★ 5.0</span>
              <span className="hero__stat-label">Customer Rating</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">3</span>
              <span className="hero__stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__circle hero__circle--lg" />
        <div className="hero__circle hero__circle--md" />
        <div className="hero__circle hero__circle--sm" />
        <span className="hero__emoji">☕</span>
      </div>
    </section>
  )
}
