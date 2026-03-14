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

  const sightingsToShow = filteredSightings || sightings;

  return (
    <div className="page-container">
      <NewSightingForm />

      <SightingsDateSearch onResults={setFilteredSightings} />

      {filteredSightings && (
        <button
          onClick={() => setFilteredSightings(null)}
          className="nav-btn"
          style={{ background: '#ccc', color: '#000', marginBottom: '20px' }}>
          Clear Search
        </button>
      )}

      <h2 className="section-title">Sightings</h2>

      {sightingsToShow.map((s) => (
        <div key={s.id} className="card">
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
