import { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE;

export default function IndividualsList() {
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/individuals`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch individuals');
        }
        return res.json();
      })
      .then((data) => {
        setIndividuals(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load individuals.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (individuals.length === 0) {
    return <p>No individuals found.</p>;
  }

  return (
    <div>
      <h2>Individuals Summary</h2>

      {individuals.map((ind) => (
        <div
          key={ind.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}>
          <p>
            <strong>Nickname:</strong> {ind.nickname}
          </p>
          <p>
            <strong>Scientist:</strong> {ind.scientist}
          </p>
          <p>
            <strong>Total Sightings:</strong> {ind.sighting_count}
          </p>

          <p>
            <strong>First Sighting:</strong>{' '}
            {ind.first_sighting
              ? new Date(ind.first_sighting).toLocaleString()
              : 'No sightings yet'}
          </p>

          <p>
            <strong>Most Recent Sighting:</strong>{' '}
            {ind.last_sighting
              ? new Date(ind.last_sighting).toLocaleString()
              : 'No sightings yet'}
          </p>
        </div>
      ))}
    </div>
  );
}
