import React from 'react';
import { me } from '../api';

export default function Home() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    me().then((data) => {
      if (data.user) setUser(data.user);
      else setError(data.error || 'Not logged in');
    }).catch(() => setError('Failed to load'));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to Test City!</h1>
      {user ? (
        <div>
          <p>You are logged in as <strong>{user.fullName}</strong> ({user.email})</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p style={{ color: 'crimson' }}>{error}</p>
      )}
    </div>
  );
}
