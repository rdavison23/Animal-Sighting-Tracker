import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function NewSightingForm() {
  const [individuals, setIndividuals] = useState([]);

  const [individualId, setIndividualId] = useState('');
  const [sightedAt, setSightedAt] = useState('');
  const [location, setLocation] = useState('');
  const [healthy, setHealthy] = useState(false);
  const [email, setEmail] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/individuals`)
      .then((res) => res.json())
      .then((data) => setIndividuals(data))
      .catch(() => setError('Failed to load individuals.'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!individualId || !sightedAt || !location || !email) {
      setError('Please fill in all required fields.');
      return;
    }

    const newSighting = {
      individual_id: Number(individualId),
      sighted_at: sightedAt,
      location,
      healthy,
      email,
    };

    try {
      const response = await fetch(`${API_BASE}/sightings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSighting),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create sighting');
      }

      await response.json();
      setSuccess('Sighting added successfully!');

      setIndividualId('');
      setSightedAt('');
      setLocation('');
      setHealthy(false);
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>Add New Sighting</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <label>Individual</label>
      <select
        value={individualId}
        onChange={(e) => setIndividualId(e.target.value)}
        required>
        <option value="">Select an individual</option>
        {individuals.map((ind) => (
          <option key={ind.id} value={ind.id}>
            {ind.nickname} (ID {ind.id})
          </option>
        ))}
      </select>

      <label>Sighted At</label>
      <input
        type="datetime-local"
        value={sightedAt}
        onChange={(e) => setSightedAt(e.target.value)}
        required
      />

      <label>Location</label>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label>
        Healthy
        <input
          type="checkbox"
          checked={healthy}
          onChange={(e) => setHealthy(e.target.checked)}
          style={{ marginLeft: '8px' }}
        />
      </label>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Add Sighting</button>
    </form>
  );
}
