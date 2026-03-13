import { useEffect, useState } from 'react';
import NewSightingForm from '../forms/NewSightingForm';
import SightingsDateSearch from './SightingsDateSearch';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [error, setError] = useState(null);
  const [filteredSightings, setFilteredSightings] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/sightings`)
      .then((res) => res.json())
      .then((data) => setSightings(data))
      .catch(() => setError('Could not load sightings.'));
  }, []);

  if (error) return <p>{error}</p>;
  if (sightings.length === 0) return <p>No sightings found.</p>;

  // If filtered results exist, show them; otherwise show all sightings
  const sightingsToShow = filteredSightings || sightings;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <NewSightingForm />

      {/* Date Range Search UI */}
      <SightingsDateSearch onResults={setFilteredSightings} />

      {/* Clear Search Button */}
      {filteredSightings && (
        <button
          onClick={() => setFilteredSightings(null)}
          style={{
            marginBottom: '20px',
            padding: '8px 12px',
            background: '#ccc',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}>
          Clear Search
        </button>
      )}

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sightings</h2>

      {sightingsToShow.map((s) => (
        <div
          key={s.id}
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: '16px',
            marginBottom: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}>
          <p>
            <strong>Nickname:</strong> {s.nickname}
          </p>
          <p>
            <strong>Scientist:</strong> {s.scientist_name}
          </p>
          <p>
            <strong>Species ID:</strong> {s.species_id}
          </p>
          <p>
            <strong>Date:</strong> {new Date(s.sighted_at).toLocaleString()}
          </p>
          <p>
            <strong>Location:</strong> {s.location}
          </p>
          <p>
            <strong>Healthy:</strong> {s.healthy ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Email:</strong> {s.email}
          </p>
        </div>
      ))}
    </div>
  );
}
