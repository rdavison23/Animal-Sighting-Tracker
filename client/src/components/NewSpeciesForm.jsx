import { useState } from 'react';

export default function NewSpeciesForm() {
  // Form state
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [estimatedPopulation, setEstimatedPopulation] = useState('');
  const [conservationStatus, setConservationStatus] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    setError(null);
    setSuccess(null);

    // Basic validation
    if (!commonName || !scientificName) {
      setError('Common name and scientific name are required.');
      return;
    }

    const newSpecies = {
      common_name: commonName,
      scientific_name: scientificName,
      estimated_population: estimatedPopulation || null,
      conservation_status: conservationStatus || null,
    };

    try {
      const response = await fetch('http://localhost:3001/species', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpecies),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create species');
      }

      const created = await response.json();
      setSuccess('Species added successfully!');

      // Clear form
      setCommonName('');
      setScientificName('');
      setEstimatedPopulation('');
      setConservationStatus('');
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
        Common Name*:
        <input
          type="text"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Scientific Name*:
        <input
          type="text"
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
        Conservation Status (e.g. EN, CR, VU):
        <input
          type="text"
          value={conservationStatus}
          onChange={(e) => setConservationStatus(e.target.value)}
        />
      </label>
      <br />

      <button type="submit">Add Species</button>
    </form>
  );
}
