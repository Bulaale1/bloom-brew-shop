const pool = require('../db/pool');

const TRANSITIONS = {
  pending:   ['preparing', 'cancelled'],
  preparing: ['ready',     'cancelled'],
  ready:     ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

const rowToOrder = (row) => ({
  id:         row.id,
  items:      row.items,
  totalCents: row.total_cents,
  status:     row.status,
  createdAt:  row.created_at,
});

const generateOrderId = () =>
  `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getAll = async () => {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return rows.map(rowToOrder);
};

const getById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return rows.length ? rowToOrder(rows[0]) : null;
};

const createOrder = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Order must contain at least one item' };
  }

  const resolvedItems = [];

  for (const line of items) {
    if (!line || typeof line !== 'object') {
      return { error: 'Each order item must be an object with itemId and quantity' };
    }

    const { itemId, quantity } = line;
    const { rows } = await pool.query('SELECT * FROM menu_items WHERE id = $1', [itemId]);

    if (!rows.length) return { error: `Item '${itemId}' not found on menu` };

    const menuItem = rows[0];
    if (menuItem.available === false) {
      return { error: `'${menuItem.name}' is not currently available` };
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for item '${itemId}'` };
    }

    resolvedItems.push({
      itemId,
      name:       menuItem.name,
      quantity,
      priceCents: menuItem.price_cents,
    });
  }

  const totalCents = resolvedItems.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const id = generateOrderId();

  const { rows } = await pool.query(
    `INSERT INTO orders (id, items, total_cents, status, created_at)
     VALUES ($1, $2, $3, 'pending', NOW()) RETURNING *`,
    [id, JSON.stringify(resolvedItems), totalCents]
  );
  return { order: rowToOrder(rows[0]) };
};

const updateStatus = async (id, status) => {
  const order = await getById(id);
  if (!order) return { error: `Order with ID '${id}' not found` };

  const allowed = TRANSITIONS[order.status];
  if (!allowed) return { error: `Unknown current status '${order.status}'` };

  if (!allowed.includes(status)) {
    if (allowed.length === 0) {
      return { error: `Order is already '${order.status}' and cannot be changed` };
    }
    return {
      error: `Cannot transition from '${order.status}' to '${status}'. Allowed: ${allowed.join(', ')}`,
    };
  }

  const { rows } = await pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return { order: rowToOrder(rows[0]) };
};

const deleteOrder = async (id) => {
  const { rows } = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
  if (!rows.length) return { error: `Order with ID '${id}' not found or already deleted` };
  return { order: rowToOrder(rows[0]) };
};

module.exports = { getAll, getById, createOrder, updateStatus, deleteOrder };
