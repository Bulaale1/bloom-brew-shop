import { useState, useEffect, useCallback } from 'react'
import { getMenu, searchMenu } from './api/menu'
import { createOrder } from './api/orders'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryTabs from './components/CategoryTabs'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'
import OrderConfirmation from './components/OrderConfirmation'
import LoginModal from './components/LoginModal'
import Dashboard from './components/Dashboard'
import Testimonials from './components/Testimonials'
import Hero from './components/Hero'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('bb_token'))
  const [showLogin, setShowLogin] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const handleLoginSuccess = () => {
    setIsAdmin(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('bb_token')
    setIsAdmin(false)
    setShowDashboard(false)
  }

  const [menu, setMenu] = useState(null)
  const [menuError, setMenuError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState(null)

  useEffect(() => {
    getMenu()
      .then(setMenu)
      .catch((err) => setMenuError(err.message))
  }, [])

  const handleSearch = useCallback((q) => {
    setSearchQuery(q)
    if (!q.trim()) {
      setSearchResults(null)
      return
    }
    setSearchLoading(true)
    searchMenu(q)
      .then(setSearchResults)
      .catch(() => setSearchResults([]))
      .finally(() => setSearchLoading(false))
  }, [])

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults(null)
  }

  const cartCount = Object.values(cart).reduce((sum, { quantity }) => sum + quantity, 0)
  const cartTotal = Object.values(cart).reduce(
    (sum, { item, quantity }) => sum + item.priceCents * quantity,
    0
  )

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        item,
        quantity: (prev[item.id]?.quantity ?? 0) + 1,
      },
    }))
  }

  const updateQuantity = (itemId, delta) => {
    setCart((prev) => {
      const next = (prev[itemId]?.quantity ?? 0) + delta
      if (next <= 0) {
        const { [itemId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: { ...prev[itemId], quantity: next } }
    })
  }

  const placeOrder = async () => {
    setPlacing(true)
    setOrderError(null)
    try {
      const items = Object.values(cart).map(({ item, quantity }) => ({
        itemId: item.id,
        quantity,
      }))
      const placed = await createOrder(items)
      setOrder(placed)
      setCart({})
      setCartOpen(false)
    } catch (err) {
      setOrderError(err.message)
    } finally {
      setPlacing(false)
    }
  }

  const sharedHeader = (
    <Header
      cartCount={cartCount}
      onCartClick={() => setCartOpen(true)}
      isAdmin={isAdmin}
      onDashboard={() => setShowDashboard(true)}
      onLoginClick={() => setShowLogin(true)}
      onLogout={handleLogout}
    />
  )

  if (order) {
    return (
      <>
        <Header cartCount={0} onCartClick={() => {}} isAdmin={isAdmin}
          onDashboard={() => setShowDashboard(true)}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
        />
        <OrderConfirmation order={order} onNewOrder={() => setOrder(null)} />
        <Footer />
      </>
    )
  }

  if (showDashboard && isAdmin) {
    return (
      <>
        {sharedHeader}
        <Dashboard onLogout={handleLogout} />
      </>
    )
  }

  return (
    <>
      {sharedHeader}

      {searchResults === null && (
        <Hero onShopNow={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })} />
      )}

      <main className="main" id="menu-section">
        {menuError && <p className="error-banner">{menuError}</p>}
        <SearchBar value={searchQuery} onChange={handleSearch} onClear={clearSearch} />
        {searchResults === null && (
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        )}
        <MenuGrid
          items={searchResults ?? menu?.[activeCategory] ?? []}
          loading={searchResults === null ? (!menu && !menuError) : searchLoading}
          cart={cart}
          onAdd={addToCart}
        />
        {searchResults === null && <Testimonials />}
      </main>

      <Cart
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        placing={placing}
        error={orderError}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={placeOrder}
      />

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)} aria-hidden="true" />
      )}

      {showLogin && (
        <LoginModal onSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />
      )}

      <Footer />
    </>
  )
}
