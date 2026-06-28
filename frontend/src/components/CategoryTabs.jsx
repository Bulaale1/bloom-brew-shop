const CATEGORIES = [
  { id: 'coffee',    label: 'Coffee',    emoji: '☕' },
  { id: 'desserts',  label: 'Desserts',  emoji: '🍰' },
  { id: 'smoothies', label: 'Smoothies', emoji: '🥤' },
]

export default function CategoryTabs({ active, onChange }) {
  return (
    <nav className="tabs" aria-label="Menu categories">
      {CATEGORIES.map(({ id, label, emoji }) => (
        <button
          key={id}
          className={`tabs__tab${active === id ? ' tabs__tab--active' : ''}`}
          onClick={() => onChange(id)}
          aria-current={active === id ? 'page' : undefined}
        >
          <span aria-hidden="true">{emoji}</span>
          {label}
        </button>
      ))}
    </nav>
  )
}
