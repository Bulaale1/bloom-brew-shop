export default function Header({ cartCount, onCartClick, isAdmin, onDashboard, onLoginClick, onLogout }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">☕</span>
        <span className="header__name">Bloom &amp; Brew</span>
      </div>

      <div className="header__actions">
        {isAdmin ? (
          <>
            <button className="header__admin-btn" onClick={onDashboard}>Dashboard</button>
            <button className="header__admin-btn header__admin-btn--muted" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <button className="header__admin-btn header__admin-btn--muted" onClick={onLoginClick}>Admin</button>
        )}

        <button className="header__cart-btn" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="header__badge" aria-live="polite">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
