import { useEffect, useState } from 'react';


export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/sightings')
      .then((res) => res.json())
      .then((data) => setSightings(data))
      .catch(() => setError('Could not load sightings.'));
  }, []);

  if (error) return <p>{error}</p>;
  if (sightings.length === 0) return <p>No sightings yet.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Sightings</h1>

      {sightings.map((s) => (
        <div
          key={s.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#fafafa',
          }}>
          <p>
            <strong>Location:</strong> {s.location}
          </p>
          <p>
            <strong>Date:</strong> {new Date(s.sighted_at).toLocaleString()}
          </p>
          <p>
            <strong>Healthy:</strong> {s.healthy ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </div>
  );
}

