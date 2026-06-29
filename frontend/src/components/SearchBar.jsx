export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className="search-bar__input"
        type="search"
        placeholder="Search drinks & desserts…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search menu"
      />
      {value && (
        <button className="search-bar__clear" onClick={onClear} aria-label="Clear search">✕</button>
      )}
    </div>
  )
}
