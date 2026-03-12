import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;
export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('API_BASE =', API_BASE);
    console.log('Fetching:', `${API_BASE}/sightings`);
    fetch(`${API_BASE}/sightings`)
      .then((res) => res.json())
      .then((data) => setSightings(data))
      .catch(() => setError('Could not load sightings.'));
  }, []);

  if (error) return <p>{error}</p>;
  if (sightings.length === 0) return <p>No sightings yet.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Sightings</h1>

      {sightings.map((sighting) => (
        <div
          key={sighting.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#fafafa',
          }}>
          <p>
            <strong>Nickname:</strong> {sighting.nickname}
          </p>
          <p>
            <strong>Location:</strong> {sighting.location}
          </p>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(sighting.sighted_at).toLocaleString()}
          </p>
          <p>
            <strong>Healthy:</strong> {sighting.healthy ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Email:</strong> {sighting.email}
          </p>
        </div>
      ))}
    </div>
  );
}
