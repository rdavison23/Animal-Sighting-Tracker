import { useEffect, useState } from 'react';
import NewSpeciesForm from '../forms/NewSpeciesForm';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/species`)
      .then((res) => res.json())
      .then((data) => setSpecies(data))
      .catch(() => setError('Could not load species.'));
  }, []);

  if (error) return <p>{error}</p>;
  if (species.length === 0) return <p>No species found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <NewSpeciesForm />

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Species</h2>

      {species.map((sp) => (
        <div
          key={sp.id}
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: '16px',
            marginBottom: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}>
          <p>
            <strong>Common Name:</strong> {sp.common_name}
          </p>
          <p>
            <strong>Scientific Name:</strong> {sp.scientific_name}
          </p>
          <p>
            <strong>Estimated Population:</strong>{' '}
            {sp.estimated_population ?? 'Unknown'}
          </p>
          <p>
            <strong>Conservation Status:</strong>{' '}
            {sp.conservation_status ?? 'Unknown'}
          </p>
        </div>
      ))}
    </div>
  );
}
