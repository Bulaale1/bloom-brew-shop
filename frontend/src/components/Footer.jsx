export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon" aria-hidden="true">☕</span>
            <span className="footer__logo-name">Bloom &amp; Brew</span>
          </div>
          <p className="footer__tagline">
            Handcrafted coffees, indulgent desserts,<br />
            and revitalizing smoothies — made with love.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" className="footer__social" aria-label="Twitter / X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="footer__social" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h3 className="footer__col-title">Menu</h3>
            <ul className="footer__col-list">
              <li><a href="#menu-section" className="footer__link">Coffee</a></li>
              <li><a href="#menu-section" className="footer__link">Desserts</a></li>
              <li><a href="#menu-section" className="footer__link">Smoothies</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Visit Us</h3>
            <ul className="footer__col-list">
              <li className="footer__detail">123 Brew Street</li>
              <li className="footer__detail">Nairobi, Kenya</li>
              <li className="footer__detail">Mon – Fri: 7am – 8pm</li>
              <li className="footer__detail">Sat – Sun: 8am – 9pm</li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__col-list">
              <li><a href="mailto:hello@bloomandbrew.com" className="footer__link">hello@bloomandbrew.com</a></li>
              <li><a href="tel:+254700000000" className="footer__link">+254 700 000 000</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p className="footer__copy">&copy; {year} Bloom &amp; Brew. All rights reserved.</p>
        <p className="footer__made">Made with ☕ &amp; love</p>
      </div>
    </footer>
  )
}
