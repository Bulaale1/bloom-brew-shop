const menuServices = require('../services/menu.service');

const getAllMenu = (req,res)=>{
const data = menuServices.getall();
res.json(data);  
}
// getAllMenu();

const getItemById = (req,res)=>{
    const {id} = req.params;
    const data = menuServices.getById(id);
    if (!data){
        return res.status(404).json({error:'Item not found!'});
    }
    res.json(data);
 }

 //getItemById();

const getByCategory= (req,res)=>{
    const {type} = req.params;
    const data = menuServices.getByCategory(type);
    const allowed = ['coffee','desserts','smoothies']
     if (!allowed.includes(type)){
        return res.status(404).json({error:'Category not found!'});
    }
    res.json(data);
 };

 // CREATE
const createMenuItem = (req, res) => {
  const item = req.body;

  if (!item.category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  const created = menuServices.createItem(item);

  if (!created) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  res.status(201).json(created);
};

// UPDATE
const updateMenuItem = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updated = menuServices.updateItem(id, updatedData);

  if (!updated) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(updated);
};

// DELETE
const deleteMenuItem = (req, res) => {
  const { id } = req.params;

  const deleted = menuServices.deleteItem(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json({ message: 'Item deleted', deleted });
};



 module.exports = {
    getAllMenu,
    getItemById,
    getByCategory,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
 };



