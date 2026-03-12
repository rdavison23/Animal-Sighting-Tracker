import { useEffect, useState } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE;

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}:3001/species`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch species');
        }
        return res.json();
      })
      .then((data) => {
        setSpecies(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load species.');
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (species.length === 0) {
    return <p>No species found.</p>;
  }

  return (
    <div>
      <h2>All Species</h2>
      {species.map((sp) => (
        <div
          key={sp.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}>
          <p>
            <strong>Common Name:</strong> {sp.common_name}
          </p>
          <p>
            <strong>Scientific Name:</strong> {sp.scientific_name}
          </p>
          <p>
            <strong>Estimated Population:</strong> {sp.estimated_population}
          </p>
          <p>
            <strong>Status:</strong> {sp.conservation_status}
          </p>
        </div>
      ))}
    </div>
  );
}
