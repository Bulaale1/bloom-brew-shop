const fmt = (cents) => `$${(cents / 100).toFixed(2)}`

export default function OrderConfirmation({ order, onNewOrder }) {
  const shortId = order.id.split('-').pop()

  return (
    <main className="confirmation">
      <div className="confirmation__icon" aria-hidden="true">☕</div>
      <h1 className="confirmation__title">Order placed!</h1>
      <p className="confirmation__subtitle">Order #{shortId} · We'll have it ready soon</p>

      <ul className="confirmation__items">
        {order.items.map((item) => (
          <li key={item.itemId} className="confirmation__item">
            <span>{item.name} × {item.quantity}</span>
            <span className="confirmation__item-price">
              {fmt(item.priceCents * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="confirmation__total">
        <span>Total</span>
        <span>{fmt(order.totalCents)}</span>
      </div>

      <p className="confirmation__status">
        Status: <strong>{order.status}</strong>
      </p>

      <button className="confirmation__btn" onClick={onNewOrder}>
        Order something else
      </button>
    </main>
  )
}
