import { useState, useRef } from 'react';

export default function NewIndividualForm() {
  const [nickname, setNickname] = useState('');
  const [scientistName, setScientistName] = useState('');
  const [speciesId, setSpeciesId] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const nicknameInputRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

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

      setNickname('');
      setScientistName('');
      setSpeciesId('');

      nicknameInputRef.current.focus();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Add New Individual</h3>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Nickname</label>
      <input
        ref={nicknameInputRef}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />

      <label>Scientist Name</label>
      <input
        value={scientistName}
        onChange={(e) => setScientistName(e.target.value)}
        required
      />

      <label>Species ID</label>
      <input
        type="number"
        value={speciesId}
        onChange={(e) => setSpeciesId(e.target.value)}
        required
      />

      <button type="submit">Add Individual</button>
    </form>
  );
}
