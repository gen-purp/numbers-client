const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function saveNumber() {
const res = await fetch(`${API_URL}/api/numbers`, { method: 'POST' });
if (!res.ok) throw new Error('Failed to save number');
return res.json();
}

export async function getLastNumber() {
const res = await fetch(`${API_URL}/api/numbers/last`);
if (!res.ok) throw new Error('Failed to fetch last number');
return res.json();
}

export async function getLastDatetime() {
const res = await fetch(`${API_URL}/api/numbers/last/datetime`);
if (!res.ok) throw new Error('Failed to fetch last datetime');
return res.json();
}