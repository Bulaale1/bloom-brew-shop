const BASE = '/api';

const getToken = () => localStorage.getItem('bb_token');

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error ?? `Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const get  = (path)         => request(path);
export const post = (path, body)   => request(path, { method: 'POST',   body });
export const put  = (path, body)   => request(path, { method: 'PUT',    body });
export const patch = (path, body)  => request(path, { method: 'PATCH',  body });
export const del  = (path)         => request(path, { method: 'DELETE' });
