import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);

  // Load all species
  useEffect(() => {
    fetch(`${API_BASE}/species`)
      .then((res) => res.json())
      .then((data) => setSpecies(data))
      .catch(() => setError('Could not load species.'));
  }, []);

  // Load individuals and sightings when a species is selected
  useEffect(() => {
    if (!selectedSpecies) return;

    fetch(`${API_BASE}/individuals/by-species/${selectedSpecies.id}`)
      .then((res) => res.json())
      .then((data) => setIndividuals(data))
      .catch(() => setIndividuals([]));

    fetch(`${API_BASE}/sightings/by-species/${selectedSpecies.id}`)
      .then((res) => res.json())
      .then((data) => setSightings(data))
      .catch(() => setSightings([]));
  }, [selectedSpecies]);

  if (error) return <p>{error}</p>;
  if (species.length === 0) return <p>No species found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Species List
      </h2>

      {species.map((sp) => {
        const isSelected = selectedSpecies?.id === sp.id;

        return (
          <div
            key={sp.id}
            onClick={() => setSelectedSpecies(sp)}
            style={{
              background: isSelected ? '#eef6ff' : '#fff',
              border: isSelected ? '2px solid #4a90e2' : '1px solid #ddd',
              padding: '16px',
              marginBottom: '16px',
              borderRadius: '8px',
              boxShadow: isSelected
                ? '0 4px 12px rgba(0,0,0,0.15)'
                : '0 2px 4px rgba(0,0,0,0.05)',
              transition:
                'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}>
            <p>
              <strong>Common Name:</strong> {sp.common_name}
            </p>
            <p>
              <strong>Scientific Name:</strong> {sp.scientific_name}
            </p>
          </div>
        );
      })}

      {/* DETAILS PANEL */}
      {selectedSpecies && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#f9f9f9',
            animation: 'slideDown 0.3s ease-out',
          }}>
          <h3>Details for {selectedSpecies.common_name}</h3>

          <p>
            <strong>Scientific Name:</strong> {selectedSpecies.scientific_name}
          </p>

          {/* Individuals */}
          <h4 style={{ marginTop: '20px' }}>Individuals of this Species</h4>

          {individuals.length > 0 ? (
            individuals.map((ind) => (
              <div
                key={ind.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  padding: '12px',
                  marginBottom: '10px',
                  borderRadius: '6px',
                }}>
                <p>
                  <strong>Nickname:</strong> {ind.nickname}
                </p>
                <p>
                  <strong>Scientist:</strong> {ind.scientist_name}
                </p>
              </div>
            ))
          ) : (
            <p>No individuals found.</p>
          )}

          {/* Sightings */}
          <h4 style={{ marginTop: '20px' }}>Sightings of this Species</h4>

          {sightings.length > 0 ? (
            sightings.map((s) => (
              <div
                key={s.id}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  padding: '12px',
                  marginBottom: '10px',
                  borderRadius: '6px',
                }}>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(s.sighted_at).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {s.location}
                </p>
                <p>
                  <strong>Healthy:</strong> {s.healthy ? 'Yes' : 'No'}
                </p>
              </div>
            ))
          ) : (
            <p>No sightings yet.</p>
          )}

          <button
            onClick={() => {
              setSelectedSpecies(null);
              setIndividuals([]);
              setSightings([]);
            }}
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              background: '#333',
              color: 'white',
              cursor: 'pointer',
            }}>
            Close
          </button>
        </div>
      )}

      {/* Slide-down animation */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
