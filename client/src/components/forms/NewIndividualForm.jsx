import { useState, useRef } from 'react';

export default function NewIndividualForm() {
  // Form fields
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const nameInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!name || !species || !age) {
      setError('Please fill in all required fields.');
      return;
    }

    const newIndividual = {
      name,
      species,
      age: Number(age),
    };

    try {
      const response = await fetch('http://localhost:3001/individuals', {
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
      setName('');
      setSpecies('');
      setAge('');

      // Move cursor back to the first field
      nameInputRef.current.focus();
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
        Name*:
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Species*:
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Age*:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Add Individual</button>
    </form>
  );
}
