const fmt = (cents) => `$${(cents / 100).toFixed(2)}`

export default function Cart({
  open, cart, total, placing, error,
  onClose, onUpdateQuantity, onPlaceOrder,
}) {
  const items = Object.values(cart)

  return (
    <aside
      className={`cart${open ? ' cart--open' : ''}`}
      aria-label="Shopping cart"
      aria-hidden={!open}
    >
      <div className="cart__header">
        <h2 className="cart__title">Your Order</h2>
        <button className="cart__close" onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      {items.length === 0 ? (
        <div className="cart__empty">
          <span className="cart__empty-icon" aria-hidden="true">🛒</span>
          <p>Your cart is empty.</p>
          <p>Add something from the menu!</p>
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {items.map(({ item, quantity }) => (
              <li key={item.id} className="cart__item">
                <div className="cart__item-row">
                  <span className="cart__item-name">{item.name}</span>
                  <span className="cart__item-price">{fmt(item.priceCents * quantity)}</span>
                </div>
                <div className="cart__qty">
                  <button
                    className="cart__qty-btn"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>
                  <span className="cart__qty-count">{quantity}</span>
                  <button
                    className="cart__qty-btn"
                    onClick={() => onUpdateQuantity(item.id, +1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart__footer">
            <div className="cart__total">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
            {error && <p className="cart__error">{error}</p>}
            <button
              className="cart__place-btn"
              onClick={onPlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing order…' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
