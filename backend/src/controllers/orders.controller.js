const ordersService = require('../services/orders.service');

const getAllOrders = async (req, res, next) => {
  try {
    res.json(await ordersService.getAll());
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items must be a non-empty array' });
    }
    const result = await ordersService.createOrder(items);
    if (result.error) return res.status(400).json({ error: result.error });
    res.status(201).json(result.order);
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });

    const exists = await ordersService.getById(id);
    if (!exists) return res.status(404).json({ error: 'Order not found' });

    const result = await ordersService.updateStatus(id, status);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json(result.order);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const result = await ordersService.deleteOrder(req.params.id);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json({ message: 'Order deleted', deleted: result.order });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
