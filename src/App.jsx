import React, { useState } from 'react';
import { saveNumber, getLastNumber, getLastDatetime } from './api.js';

export default function App() {
  const [status, setStatus] = useState('Ready');
  const [lastValue, setLastValue] = useState(null);
  const [lastTime, setLastTime] = useState(null);

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      const data = await saveNumber();
      setStatus(`Saved: ${data.value}`);
      setLastValue(data.value);
      setLastTime(new Date(data.savedAt).toLocaleString());
    } catch (e) {
      setStatus(e.message);
    }
  };

  const handleShowLast = async () => {
    setStatus('Loading last number...');
    try {
      const data = await getLastNumber();
      setLastValue(data.value);
      setStatus('Loaded');
    } catch (e) {
      setStatus(e.message);
    }
  };

  const handleShowLastTime = async () => {
    setStatus('Loading last datetime...');
    try {
      const data = await getLastDatetime();
      setLastTime(data.savedAt ? new Date(data.savedAt).toLocaleString() : null);
      setStatus('Loaded');
    } catch (e) {
      setStatus(e.message);
    }
  };

  const box = {
    maxWidth: 560,
    margin: '60px auto',
    padding: 24,
    border: '1px solid #ddd',
    borderRadius: 12,
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Noto Sans, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const btn = { padding: '10px 16px', marginRight: 12, cursor: 'pointer' };

  return (
    <div style={box}>
      <h1>Numbers Saver</h1>
      <p>Quick MERN demo with three buttons.</p>

      <div style={{ marginBottom: 16 }}>
        <button style={btn} onClick={handleSave}>
          Save a number
        </button>
        <button style={btn} onClick={handleShowLast}>
          Show last number
        </button>
        <button style={btn} onClick={handleShowLastTime}>
          Show datetime last number saved
        </button>
      </div>

      <div>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Last number:</strong> {lastValue ?? '—'}
        </p>
        <p>
          <strong>Last saved at:</strong> {lastTime ?? '—'}
        </p>
      </div>

      <hr />
      <p>
        <small>
          API: {import.meta.env.VITE_API_URL || 'http://localhost:3001'}
        </small>
      </p>
    </div>
  );
}
