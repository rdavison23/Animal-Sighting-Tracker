import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function IndividualsList() {
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);

  const [selectedIndividual, setSelectedIndividual] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [individualSightings, setIndividualSightings] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/individuals/summary`)
      .then((res) => res.json())
      .then((data) => setIndividuals(data))
      .catch(() => setError('Could not load individuals.'));
  }, []);

  // Fetch species + sightings when an individual is selected
  useEffect(() => {
    if (!selectedIndividual) return;

    fetch(`${API_BASE}/species/${selectedIndividual.species_id}`)
      .then((res) => res.json())
      .then((data) => setSpeciesInfo(data))
      .catch(() => setSpeciesInfo(null));

    fetch(`${API_BASE}/sightings/by-individual/${selectedIndividual.id}`)
      .then((res) => res.json())
      .then((data) => setIndividualSightings(data))
      .catch(() => setIndividualSightings([]));
  }, [selectedIndividual]);

  if (error) return <p>{error}</p>;
  if (individuals.length === 0) return <p>No individuals found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Individuals Summary
      </h2>

      {individuals.map((ind) => {
        const isSelected = selectedIndividual?.id === ind.id;

        return (
          <div
            key={ind.id}
            onClick={() => setSelectedIndividual(ind)}
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
              <strong>Nickname:</strong> {ind.nickname}
            </p>
            <p>
              <strong>Scientist:</strong> {ind.scientist_name}
            </p>
            <p>
              <strong>Species ID:</strong> {ind.species_id}
            </p>
            <p>
              <strong>Total Sightings:</strong> {ind.sighting_count}
            </p>
            <p>
              <strong>First Sighting:</strong>
              {ind.first_sighting
                ? new Date(ind.first_sighting).toLocaleString()
                : 'No sightings yet'}
            </p>
            <p>
              <strong>Most Recent Sighting:</strong>
              {ind.last_sighting
                ? new Date(ind.last_sighting).toLocaleString()
                : 'No sightings yet'}
            </p>
          </div>
        );
      })}

      {/* DETAILS PANEL */}
      {selectedIndividual && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#f9f9f9',
            animation: 'slideDown 0.3s ease-out',
          }}>
          <h3>Details for {selectedIndividual.nickname}</h3>

          <p>
            <strong>Scientist:</strong> {selectedIndividual.scientist_name}
          </p>

          {/* Species Info */}
          {speciesInfo ? (
            <>
              <p>
                <strong>Species:</strong> {speciesInfo.common_name}
              </p>
              <p>
                <strong>Scientific Name:</strong> {speciesInfo.scientific_name}
              </p>
            </>
          ) : (
            <p>Loading species info...</p>
          )}

          <h4 style={{ marginTop: '20px' }}>Sightings for this Individual</h4>

          {individualSightings.length > 0 ? (
            individualSightings.map((s) => (
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
              setSelectedIndividual(null);
              setSpeciesInfo(null);
              setIndividualSightings([]);
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
