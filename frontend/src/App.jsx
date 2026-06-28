import { useState, useEffect } from 'react'
import { getMenu } from './api/menu'
import { createOrder } from './api/orders'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'
import OrderConfirmation from './components/OrderConfirmation'
import './App.css'

export default function App() {
  const [menu, setMenu] = useState(null)
  const [menuError, setMenuError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [cart, setCart] = useState({})        // { itemId: { item, quantity } }
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState(null)

  useEffect(() => {
    getMenu()
      .then(setMenu)
      .catch((err) => setMenuError(err.message))
  }, [])

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

  if (order) {
    return (
      <>
        <Header cartCount={0} onCartClick={() => {}} />
        <OrderConfirmation order={order} onNewOrder={() => setOrder(null)} />
      </>
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="main">
        {menuError && <p className="error-banner">{menuError}</p>}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <MenuGrid
          items={menu?.[activeCategory] ?? []}
          loading={!menu && !menuError}
          cart={cart}
          onAdd={addToCart}
        />
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
    </>
  )
}
