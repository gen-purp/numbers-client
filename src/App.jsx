import React, { useState } from 'react';
import { saveNumber, getSecondNumber, getSecondDatetime } from './api.js';

export default function App() {
  const [savedMsg, setSavedMsg] = useState('—');
  const [secondValue, setSecondValue] = useState('—');
  const [secondTime, setSecondTime] = useState('—');

  const [saving, setSaving] = useState(false);
  const [loadingSecond, setLoadingSecond] = useState(false);
  const [loadingSecondTime, setLoadingSecondTime] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await saveNumber();
      const ts = new Date(data.savedAt).toLocaleString();
      setSavedMsg(`Number ${data.value} saved at ${ts}`);
    } catch (e) {
      setSavedMsg(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSecond = async () => {
    setLoadingSecond(true);
    try {
      const data = await getSecondNumber();
      setSecondValue(data?.value ?? '—');
    } catch (e) {
      setSecondValue(e.message);
    } finally {
      setLoadingSecond(false);
    }
  };

  const handleSecondTime = async () => {
    setLoadingSecondTime(true);
    try {
      const data = await getSecondDatetime();
      setSecondTime(data?.savedAt ? new Date(data.savedAt).toLocaleString() : '—');
    } catch (e) {
      setSecondTime(e.message);
    } finally {
      setLoadingSecondTime(false);
    }
  };

  const container = {
    maxWidth: 720,
    margin: '60px auto',
    padding: 24,
    border: '1px solid #ddd',
    borderRadius: 12,
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Noto Sans, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  // Two-column grid: buttons on the left, results on the right
  const grid = {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '12px 16px',
    alignItems: 'center',
  };

  const btn = { padding: '10px 16px', cursor: 'pointer', width: '100%', textAlign: 'left' };
  const label = { padding: '8px 10px', background: '#fafafa', borderRadius: 8, border: '1px solid #eee' };
  const heading = { marginTop: 0, marginBottom: 12 };

  return (
    <div style={container}>
      <h1 style={heading}>Numbers Saver</h1>
      <p style={{ marginTop: 0 }}>Three actions, stacked vertically with results shown alongside.</p>

      <div style={grid}>
        {/* Row 1 */}
        <button style={btn} onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save a number'}
        </button>
        <div style={label}>{savedMsg}</div>

        {/* Row 2 */}
        <button style={btn} onClick={handleSecond} disabled={loadingSecond}>
          {loadingSecond ? 'Loading…' : 'Second-most-recent number'}
        </button>
        <div style={label}>{secondValue}</div>

        {/* Row 3 */}
        <button style={btn} onClick={handleSecondTime} disabled={loadingSecondTime}>
          {loadingSecondTime ? 'Loading…' : 'Show datetime second-most-recent number saved'}
        </button>
        <div style={label}>{secondTime}</div>
      </div>

      <hr style={{ marginTop: 24, marginBottom: 12 }} />
      <p>
        <small>API: {import.meta.env.VITE_API_URL || 'http://localhost:3000'}</small>
      </p>
    </div>
  );
}



// ============================================================================================
// Mon 20 Oct 4:36AM - was working (before adding vertical buttons, 2nd-most-recent number etc)

// import React, { useState } from 'react';
// import { saveNumber, getLastNumber, getLastDatetime } from './api.js';

// export default function App() {
//   const [status, setStatus] = useState('Ready');
//   const [lastValue, setLastValue] = useState(null);
//   const [lastTime, setLastTime] = useState(null);

//   const handleSave = async () => {
//     setStatus('Saving...');
//     try {
//       const data = await saveNumber();
//       setStatus(`Saved: ${data.value}`);
//       setLastValue(data.value);
//       setLastTime(new Date(data.savedAt).toLocaleString());
//     } catch (e) {
//       setStatus(e.message);
//     }
//   };

//   const handleShowLast = async () => {
//     setStatus('Loading last number...');
//     try {
//       const data = await getLastNumber();
//       setLastValue(data.value);
//       setStatus('Loaded');
//     } catch (e) {
//       setStatus(e.message);
//     }
//   };

//   const handleShowLastTime = async () => {
//     setStatus('Loading last datetime...');
//     try {
//       const data = await getLastDatetime();
//       setLastTime(data.savedAt ? new Date(data.savedAt).toLocaleString() : null);
//       setStatus('Loaded');
//     } catch (e) {
//       setStatus(e.message);
//     }
//   };

//   const box = {
//     maxWidth: 560,
//     margin: '60px auto',
//     padding: 24,
//     border: '1px solid #ddd',
//     borderRadius: 12,
//     fontFamily:
//       'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Noto Sans, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
//   };

//   const btn = { padding: '10px 16px', marginRight: 12, cursor: 'pointer' };

//   return (
//     <div style={box}>
//       <h1>Numbers Saver</h1>
//       <p>Quick MERN demo with three buttons.</p>

//       <div style={{ marginBottom: 16 }}>
//         <button style={btn} onClick={handleSave}>
//           Save a number
//         </button>
//         <button style={btn} onClick={handleShowLast}>
//           Show last number
//         </button>
//         <button style={btn} onClick={handleShowLastTime}>
//           Show datetime last number saved
//         </button>
//       </div>

//       <div>
//         <p>
//           <strong>Status:</strong> {status}
//         </p>
//         <p>
//           <strong>Last number:</strong> {lastValue ?? '—'}
//         </p>
//         <p>
//           <strong>Last saved at:</strong> {lastTime ?? '—'}
//         </p>
//       </div>

//       <hr />
//       <p>
//         <small>
//           API: {import.meta.env.VITE_API_URL || 'http://localhost:3001'}
//         </small>
//       </p>
//     </div>
//   );
// }
