const cafeMenu = require('../data/menu');

//Read
//Get all items on the menu
const getall  = () => cafeMenu;
const allItems = Object.values(cafeMenu).flat();


// Get an item based on id
const getById = (id) => {
  return allItems.find(item => item.id === id);
};

// get items by category
const getByCategory = (category) =>{
    return cafeMenu[category];
};
//End of read operation;

// CREATE
const createItem = (item) => {
  const { category } = item;

  if (!cafeMenu[category]) {
    return null;
  }

  cafeMenu[category].push(item);
  return item;
};
// UPDATE
const updateItem = (id, updatedData) => {
  for (const category in cafeMenu) {
    const index = cafeMenu[category].findIndex(i => i.id === id);

    if (index !== -1) {
      cafeMenu[category][index] = {
        ...cafeMenu[category][index],
        ...updatedData
      };
      return cafeMenu[category][index];
    }
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
