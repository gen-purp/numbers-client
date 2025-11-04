const API = import.meta.env.VITE_API_URL; // e.g. https://api.testcity.xyz

export async function register({ email, fullName, password }) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fullName, password })
  });
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function me() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/api/me`, {
    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
  });
  return res.json();
}
