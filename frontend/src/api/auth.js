import { post } from './client';

export const login = (username, password) => post('/auth/login', { username, password });
