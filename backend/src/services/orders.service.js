/**
 * Orders service layer.
 *
 * Every public function returns a result envelope:
 *   - success: { order }  (getAll returns the raw collection)
 *   - failure: { error: <message> }
 */

const orders = require('../data/orders');
const cafeMenu = require('../data/menu');

/**
 * Find a menu item by id across every category.
 * @param {string} id
 * @returns {object|null} the menu item, or null if no category contains it
 */
const findMenuItemById = (id) => {
  for (const category in cafeMenu) {
    const found = cafeMenu[category].find(item => item.id === id);
    if (found) return found;
  }
  return null;
};

/** @returns {object[]} the live orders collection */
const getAll = () => orders;

/**
 * @param {string} id
 * @returns {object|null} the matching order, or null if none exists
 */
const getById = (id) => orders.find(order => order.id === id) || null;

// Random suffix avoids id collisions when orders are created in the same millisecond.
const generateOrderId = () =>
  `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Create an order from a list of { itemId, quantity } lines.
 * Validates every line before writing anything, so a bad line leaves the store untouched.
 * @param {{ itemId: string, quantity: number }[]} items
 * @returns {{ order: object } | { error: string }}
 */
const createOrder = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Order must contain at least one item' };
  }

  const resolvedItems = [];

  for (const line of items) {
    if (!line || typeof line !== 'object') {
      return { error: 'Each order item must be an object with itemId and quantity' };
    }

    const { itemId, quantity } = line;
    const menuItem = findMenuItemById(itemId);

    if (!menuItem) return { error: `Item '${itemId}' not found on menu` };

    // Block only items explicitly flagged unavailable; a missing flag means orderable.
    if (menuItem.available === false) {
      return { error: `'${menuItem.name}' is not currently available` };
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for item '${itemId}'` };
    }

    // Snapshot name and price onto the order so it reflects the cost at purchase
    // time, even if the menu item is later renamed or repriced.
    resolvedItems.push({
      itemId,
      name: menuItem.name,
      quantity,
      priceCents: menuItem.priceCents
    });
  }

  const totalCents = resolvedItems.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

  const newOrder = {
    id: generateOrderId(),
    items: resolvedItems,
    totalCents,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  return { order: newOrder };
};

const TRANSITIONS = {
  pending:    ['preparing', 'cancelled'],
  preparing:  ['ready',     'cancelled'],
  ready:      ['completed', 'cancelled'],
  completed:  [],
  cancelled:  [],
};

/**
 * Update an order's status.
 * @param {string} id
 * @param {string} status - must be a valid next state from the current status
 * @returns {{ order: object } | { error: string }}
 */
const updateStatus = (id, status) => {
  const order = orders.find(o => o.id === id);
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

  order.status = status;
  return { order };
};

/**
 * Remove an order from the store.
 * @param {string} id
 * @returns {{ order: object } | { error: string }} the deleted order, or an error
 */
const deleteOrder = (id) => {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return { error: `Order with ID '${id}' not found or already deleted` };

  const deleted = orders.splice(index, 1)[0];
  return { order: deleted };
};

module.exports = { getAll, getById, createOrder, updateStatus, deleteOrder };