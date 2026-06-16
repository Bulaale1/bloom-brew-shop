const ordersService = require('../services/orders.service');

const getAllOrders = (req, res) => {
  res.json(ordersService.getAll());
};

const getOrderById = (req, res) => {
  const order = ordersService.getById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

const createOrder = (req, res) => {
  const { items } = req.body;

  // The service validates this too; a check here just returns a clear 400 early.
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items must be a non-empty array' });
  }

  const result = ordersService.createOrder(items);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result.order);
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: 'status is required' });

  // The service reports both "not found" and "invalid status" as { error }, so
  // check existence first to map a missing order to 404 instead of 400.
  if (!ordersService.getById(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const result = ordersService.updateStatus(id, status);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result.order);
};

const deleteOrder = (req, res) => {
  const result = ordersService.deleteOrder(req.params.id);
  if (result.error) return res.status(404).json({ error: result.error });
  res.json({ message: 'Order deleted', deleted: result.order });
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };