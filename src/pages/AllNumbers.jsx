import React, { useEffect, useState } from 'react';

export default function AllNumbers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/api/numbers/all`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Numbers</h2>
      {rows.length === 0 ? (
        <p>No numbers saved yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>_id</th>
              <th>Value</th>
              <th>Saved At</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{r._id}</td>
                <td>{r.value}</td>
                <td>{new Date(r.savedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
