import { useEffect, useState } from 'react';

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/sightings')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch sightings');
        }
        return res.json();
      })
      .then((data) => {
        setSightings(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load sightings.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (sightings.length === 0) {
    return <p>No sightings yet.</p>;
  }

  return (
    <div>
      <h2>All Sightings</h2>
      {sightings.map((sighting) => (
        <div key={sighting.id}>
          <p>Location: {sighting.location}</p>
          <p>Date: {new Date(sighting.sighted_at).toLocaleString()}</p>
          <p>Healthy: {sighting.healthy ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}
