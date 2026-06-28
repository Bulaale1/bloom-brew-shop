const pool = require('../db/pool');

const ALLOWED_CATEGORIES = ['coffee', 'desserts', 'smoothies'];

const rowToItem = (row) => {
  const item = {
    id:         row.id,
    name:       row.name,
    category:   row.category,
    priceCents: row.price_cents,
    imagePath:  row.image_path,
    available:  row.available,
  };
  if (row.variants)    item.variants    = row.variants;
  if (row.ingredients) item.ingredients = row.ingredients;
  return item;
};

// READ
const getall = async () => {
  const { rows } = await pool.query('SELECT * FROM menu_items ORDER BY category, id');
  const grouped = {};
  for (const row of rows) {
    const item = rowToItem(row);
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }
  return grouped;
};

const getById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
  return rows.length ? rowToItem(rows[0]) : null;
};

const getByCategory = async (category) => {
  const { rows } = await pool.query(
    'SELECT * FROM menu_items WHERE category = $1 ORDER BY id',
    [category]
  );
  return rows.map(rowToItem);
};

// CREATE
const createItem = async (item) => {
  const { name, category, priceCents, imagePath, available = true, variants, ingredients } = item;

  if (!ALLOWED_CATEGORIES.includes(category)) return null;

  const newId = item.id ?? `${category}-${Date.now()}`;

  const existing = await getById(newId);
  if (existing) return null;

  const { rows } = await pool.query(
    `INSERT INTO menu_items (id, name, category, price_cents, image_path, available, variants, ingredients)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      newId, name, category, priceCents, imagePath ?? null, available,
      variants    ? JSON.stringify(variants)    : null,
      ingredients ? JSON.stringify(ingredients) : null,
    ]
  );
  return rowToItem(rows[0]);
};

// UPDATE
const updateItem = async (id, updatedData) => {
  const existing = await getById(id);
  if (!existing) return null;

  const merged = { ...existing, ...updatedData };
  const targetCategory = ALLOWED_CATEGORIES.includes(merged.category)
    ? merged.category
    : existing.category;

  const { rows } = await pool.query(
    `UPDATE menu_items
     SET name=$1, category=$2, price_cents=$3, image_path=$4, available=$5, variants=$6, ingredients=$7
     WHERE id=$8 RETURNING *`,
    [
      merged.name, targetCategory, merged.priceCents, merged.imagePath ?? null,
      merged.available,
      merged.variants    ? JSON.stringify(merged.variants)    : null,
      merged.ingredients ? JSON.stringify(merged.ingredients) : null,
      id,
    ]
  );
  return rows.length ? rowToItem(rows[0]) : null;
};

// DELETE
const deleteItem = async (id) => {
  const { rows } = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);
  return rows.length ? rowToItem(rows[0]) : null;
};

module.exports = { getall, getById, getByCategory, createItem, updateItem, deleteItem };
