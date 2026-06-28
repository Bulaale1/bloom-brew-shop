const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
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
