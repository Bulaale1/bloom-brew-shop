import { useState, useEffect } from 'react'
import { getMenu, createMenuItem, deleteMenuItem } from '../api/menu'

const CATEGORIES = ['coffee', 'desserts', 'smoothies']

const EMPTY_FORM = { name: '', category: 'coffee', priceCents: '', imagePath: '' }

export default function Dashboard({ onLogout }) {
  const [menu, setMenu] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const reload = () => getMenu().then(setMenu).catch(() => {})

  useEffect(() => { reload() }, [])

  const allItems = menu ? Object.values(menu).flat() : []

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setFormError(null)
    const priceCents = parseInt(form.priceCents, 10)
    if (!form.name.trim()) return setFormError('Name is required')
    if (isNaN(priceCents) || priceCents <= 0) return setFormError('Price must be a positive number')
    setSaving(true)
    try {
      await createMenuItem({
        name: form.name.trim(),
        category: form.category,
        priceCents,
        imagePath: form.imagePath.trim() || null,
        available: true,
      })
      setForm(EMPTY_FORM)
      reload()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    setDeletingId(id)
    try {
      await deleteMenuItem(id)
      reload()
    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Admin Dashboard</h1>
        <button className="dashboard__logout" onClick={onLogout}>Log out</button>
      </div>

      {/* Add item form */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Add Menu Item</h2>
        <form className="dashboard__form" onSubmit={handleAdd}>
          {formError && <p className="modal__error">{formError}</p>}

          <div className="dashboard__form-row">
            <label className="dashboard__label">
              Name
              <input className="modal__input" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Vanilla Latte" />
            </label>

            <label className="dashboard__label">
              Category
              <select className="modal__input" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </label>

            <label className="dashboard__label">
              Price (cents)
              <input className="modal__input" name="priceCents" type="number" min="1" value={form.priceCents} onChange={handleChange} required placeholder="e.g. 450" />
            </label>

            <label className="dashboard__label">
              Image path <span className="dashboard__optional">(optional)</span>
              <input className="modal__input" name="imagePath" value={form.imagePath} onChange={handleChange} placeholder="/images/coffee/latte.jpg" />
            </label>
          </div>

          <button className="modal__submit dashboard__add-btn" type="submit" disabled={saving}>
            {saving ? 'Adding…' : '+ Add Item'}
          </button>
        </form>
      </section>

      {/* Items table */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">All Menu Items ({allItems.length})</h2>
        {!menu ? (
          <p className="dashboard__loading">Loading…</p>
        ) : (
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="dashboard__cat">{item.category}</td>
                    <td>${(item.priceCents / 100).toFixed(2)}</td>
                    <td>{item.available ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        className="dashboard__delete-btn"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? '…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
