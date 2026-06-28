const CATEGORY_EMOJI = {
  coffee:    '☕',
  desserts:  '🍰',
  smoothies: '🥤',
}

const fmt = (cents) => `$${(cents / 100).toFixed(2)}`

export default function MenuItem({ item, cartQty, onAdd }) {
  return (
    <article className={`card${item.available ? '' : ' card--unavailable'}`}>
      <div className="card__img-wrap">
        <img
          src={item.imagePath}
          alt={item.name}
          className="card__img"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <span aria-hidden="true">{CATEGORY_EMOJI[item.category] ?? '🍽️'}</span>
      </div>

      <div className="card__body">
        <h3 className="card__name">{item.name}</h3>

        {item.variants && (
          <p className="card__sub">{item.variants.join(' · ')}</p>
        )}
        {item.ingredients && (
          <p className="card__sub">{item.ingredients.join(', ')}</p>
        )}

        <div className="card__footer">
          <span className="card__price">{fmt(item.priceCents)}</span>

          {item.available ? (
            <button
              className={`card__add${cartQty > 0 ? ' card__add--in-cart' : ''}`}
              onClick={onAdd}
              aria-label={`Add ${item.name} to cart`}
            >
              {cartQty > 0 ? `Add (${cartQty})` : 'Add'}
            </button>
          ) : (
            <span className="card__unavailable-label">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  )
}
