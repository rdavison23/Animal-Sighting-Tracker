import { useEffect, useState } from 'react';
import NewSpeciesForm from '../forms/NewSpeciesForm';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);

  const loadSpecies = () => {
    fetch(`${API_BASE}/species`)
      .then((res) => res.json())
      .then((data) => setSpecies(data))
      .catch(() => setError('Could not load species.'));
  };

  useEffect(() => {
    loadSpecies();
  }, []);

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
    <div className="page-container">
      <NewSpeciesForm onCreated={loadSpecies} />

      <h2 className="section-title">Species</h2>

      {species.map((sp) => {
        const isSelected = selectedSpecies?.id === sp.id;

        return (
          <div
            key={sp.id}
            className={`card ${isSelected ? 'selected' : ''}`}
            onClick={() => setSelectedSpecies(sp)}
            style={{ cursor: 'pointer' }}>
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
        );
      })}

      {selectedSpecies && (
        <div className="card details-card">
          <h3>Details for {selectedSpecies.common_name}</h3>

          <p>
            <strong>Scientific Name:</strong> {selectedSpecies.scientific_name}
          </p>

          <h4 style={{ marginTop: '20px' }}>Individuals of this Species</h4>

          {individuals.length > 0 ? (
            individuals.map((ind) => (
              <div key={ind.id} className="card">
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

          <h4 style={{ marginTop: '20px' }}>Sightings of this Species</h4>

          {sightings.length > 0 ? (
            sightings.map((s) => (
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
              setSelectedSpecies(null);
              setIndividuals([]);
              setSightings([]);
            }}
            className="nav-btn close-btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
