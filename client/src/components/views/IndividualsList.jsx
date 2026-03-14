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
    <div className="page-container">
      <h2 className="section-title">Individuals Summary</h2>

      {individuals.map((ind) => {
        const isSelected = selectedIndividual?.id === ind.id;

        return (
          <div
            key={ind.id}
            className={`card ${isSelected ? 'selected' : ''}`}
            onClick={() => setSelectedIndividual(ind)}
            style={{ cursor: 'pointer' }}>
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
        );
      })}

      {selectedIndividual && (
        <div className="card details-card">
          <h3>Details for {selectedIndividual.nickname}</h3>

          <p>
            <strong>Scientist:</strong> {selectedIndividual.scientist_name}
          </p>

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
              <div key={s.id} className="card">
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
            className="nav-btn close-btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
