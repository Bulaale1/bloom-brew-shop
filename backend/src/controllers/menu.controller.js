const menuServices = require('../services/menu.service');
const ALLOWED_CATEGORIES = require('../constants/categories');

const getAllMenu = async (req, res, next) => {
  try {
    const data = await menuServices.getall();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const data = await menuServices.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Item not found!' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getByCategory = async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!ALLOWED_CATEGORIES.includes(type)) {
      return res.status(404).json({ error: 'Category not found!' });
    }
    const data = await menuServices.getByCategory(type);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const item = req.body;
    if (!item.category) {
      return res.status(400).json({ error: 'Category is required' });
    }
    const created = await menuServices.createItem(item);
    if (!created) {
      return res.status(400).json({ error: 'Invalid category or duplicate item ID' });
    }
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await menuServices.updateItem(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const deleted = await menuServices.deleteItem(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted', deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllMenu, getItemById, getByCategory, createMenuItem, updateMenuItem, deleteMenuItem };
