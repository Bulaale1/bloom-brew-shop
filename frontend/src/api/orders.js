import { get, post, patch, del } from './client';

// items: [{ itemId, quantity }]
export const getOrders      = ()              => get('/orders');
export const getOrder       = (id)            => get(`/orders/${id}`);
export const createOrder    = (items)         => post('/orders', { items });
export const updateOrderStatus = (id, status) => patch(`/orders/${id}/status`, { status });
export const deleteOrder    = (id)            => del(`/orders/${id}`);
