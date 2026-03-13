import { useState, useRef } from 'react';

export default function NewIndividualForm() {
  // Form fields
  const [nickname, setNickname] = useState('');
  const [scientistName, setScientistName] = useState('');
  const [speciesId, setSpeciesId] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const nicknameInputRef = useRef(null);

  // Use environment variable
  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // Validate required fields
    if (!nickname || !speciesId) {
      setError('Please fill in all required fields.');
      return;
    }

    const newIndividual = {
      nickname,
      scientist_name: scientistName,
      species_id: Number(speciesId),
    };

    try {
      const response = await fetch(`${API_BASE}/individuals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIndividual),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create individual');
      }

      await response.json();
      setSuccess('Individual added successfully!');

      // Clear form
      setNickname('');
      setScientistName('');
      setSpeciesId('');

      // Move cursor back to the first field
      nicknameInputRef.current.focus();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Individual</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <label>
        Nickname:
        <input
          ref={nicknameInputRef}
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Scientist Name:
        <input
          name="scientist_name"
          value={scientistName}
          onChange={(e) => setScientistName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Species ID:
        <input
          name="species_id"
          type="number"
          value={speciesId}
          onChange={(e) => setSpeciesId(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Add Individual</button>
    </form>
  );
}
