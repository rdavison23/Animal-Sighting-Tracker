import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function NewSightingForm() {
  const [individuals, setIndividuals] = useState([]);

  // Form fields
  const [individualId, setIndividualId] = useState('');
  const [sightedAt, setSightedAt] = useState('');
  const [location, setLocation] = useState('');
  const [healthy, setHealthy] = useState(false);
  const [email, setEmail] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load individuals for dropdown
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

      // Clear form
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
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Add New Sighting</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <label>
        Individual:
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
      </label>
      <br />

      <label>
        Sighted At:
        <input
          type="datetime-local"
          value={sightedAt}
          onChange={(e) => setSightedAt(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Location:
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Healthy:
        <input
          type="checkbox"
          checked={healthy}
          onChange={(e) => setHealthy(e.target.checked)}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Add Sighting</button>
    </form>
  );
}
