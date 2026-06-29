import { get, post, put, del } from './client';

export const getMenu           = ()           => get('/menu');
export const getMenuByCategory = (category)   => get(`/menu/category/${category}`);
export const searchMenu        = (q)          => get(`/menu/search?q=${encodeURIComponent(q)}`);
export const getMenuItem       = (id)         => get(`/menu/${id}`);
export const createMenuItem    = (item)       => post('/menu', item);
export const updateMenuItem    = (id, data)   => put(`/menu/${id}`, data);
export const deleteMenuItem    = (id)         => del(`/menu/${id}`);
