import { useState, useRef } from 'react';

export default function NewSpeciesForm() {
  // Form state
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [estimatedPopulation, setEstimatedPopulation] = useState('');
  const [conservationStatus, setConservationStatus] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const nameInputRef = useRef(null);

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

      // Move cursor back to the first field
      nameInputRef.current.focus();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Species</h2>

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green', marginBottom: '10px' }}>{success}</p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Common Name:</label>
        <input
          type="text"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <label>Scientific Name:</label>
        <input
          type="text"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <label>Estimated Population:</label>
        <input
          type="number"
          value={estimatedPopulation}
          onChange={(e) => setEstimatedPopulation(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <label>Conservation Status:</label>
        <input
          type="text"
          value={conservationStatus}
          onChange={(e) => setConservationStatus(e.target.value)}
          placeholder="e.g., Endangered, Vulnerable"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          Submit
        </button>
      </form>
    </div>
  );
}
