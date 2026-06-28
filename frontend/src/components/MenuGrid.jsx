import MenuItem from './MenuItem'

export default function MenuGrid({ items, loading, cart, onAdd }) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card card--skeleton" aria-hidden="true" />
        ))}
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="grid">
        <p className="grid__empty">No items in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {items.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          cartQty={cart[item.id]?.quantity ?? 0}
          onAdd={() => onAdd(item)}
        />
      ))}
    </div>
  )
}
