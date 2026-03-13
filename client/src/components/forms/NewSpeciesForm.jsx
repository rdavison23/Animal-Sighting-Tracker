import { useState, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function NewSpeciesForm() {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [estimatedPopulation, setEstimatedPopulation] = useState('');
  const [conservationStatus, setConservationStatus] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const commonNameRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!commonName || !scientificName) {
      setError('Common name and scientific name are required.');
      return;
    }

    const newSpecies = {
      common_name: commonName,
      scientific_name: scientificName,
      estimated_population: estimatedPopulation
        ? Number(estimatedPopulation)
        : null,
      conservation_status: conservationStatus || null,
    };

    try {
      const response = await fetch(`${API_BASE}/species`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpecies),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create species');
      }

      await response.json();
      setSuccess('Species added successfully!');

      setCommonName('');
      setScientificName('');
      setEstimatedPopulation('');
      setConservationStatus('');

      commonNameRef.current.focus();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Species</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <label>
        Common Name:
        <input
          ref={commonNameRef}
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Scientific Name:
        <input
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Estimated Population:
        <input
          type="number"
          value={estimatedPopulation}
          onChange={(e) => setEstimatedPopulation(e.target.value)}
        />
      </label>
      <br />

      <label>
        Conservation Status:
        <input
          value={conservationStatus}
          onChange={(e) => setConservationStatus(e.target.value)}
        />
      </label>
      <br />

      <button type="submit">Add Species</button>
    </form>
  );
}
