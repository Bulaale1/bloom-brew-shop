const cafeMenu = require('../data/menu');

// READ OPERATIONS
const getall = () => cafeMenu;

// Optimized searching (no extra array allocation, short-circuits on match)
const getById = (id) => {
  for (const category in cafeMenu) {
    const foundItem = cafeMenu[category].find(item => item.id === id);
    if (foundItem) return foundItem;
  }
  return null;
};

const getByCategory = (category) => {
  return cafeMenu[category] || [];
};

// CREATE
const createItem = (item) => {
  const { category } = item;

  if (!cafeMenu[category]) return null;

  const newId = item.id !== undefined ? item.id : Date.now().toString();

  if (getById(newId)) return null;

  const newItem = {
    id: newId,
    ...item
  };

  cafeMenu[category].push(newItem);
  return newItem;
};

// UPDATE
const updateItem = (id, updatedData) => {
  const { category: newCategory, ...safeData } = updatedData;

  for (const currentCategory in cafeMenu) {
    const index = cafeMenu[currentCategory].findIndex(i => i.id === id);
    if (index === -1) continue;

    const currentItem = cafeMenu[currentCategory][index];

    // Relocate only if a different, valid category was requested; otherwise stay put.
    const targetCategory =
      newCategory && cafeMenu[newCategory] ? newCategory : currentCategory;

    // FIXED: keep the item's own `category` field in sync with where it actually lives,
    // so a relocated item never reports its old category.
    const mergedItem = { ...currentItem, ...safeData, category: targetCategory };

    if (targetCategory !== currentCategory) {
      cafeMenu[currentCategory].splice(index, 1);
      cafeMenu[targetCategory].push(mergedItem);
    } else {
      cafeMenu[currentCategory][index] = mergedItem;
    }

    return mergedItem;
  }

  return null;
};

// DELETE
const deleteItem = (id) => {
  for (const category in cafeMenu) {
    const index = cafeMenu[category].findIndex(i => i.id === id);

    if (index !== -1) {
      const deleted = cafeMenu[category].splice(index, 1);
      return deleted[0];
    }
  }
  return null;
};

module.exports = {
  getall,
  getById,
  getByCategory,
  createItem,
  updateItem,
  deleteItem
};