import { useEffect, useState, useRef } from 'react';

export default function NewSightingForm() {
  // State for each form field
  const [individuals, setIndividuals] = useState([]);
  const [individualId, setIndividualId] = useState('');
  const [sightedAt, setSightedAt] = useState('');
  const [location, setLocation] = useState('');
  const [healthy, setHealthy] = useState(true);
  const [email, setEmail] = useState('');

  // State for messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const nameInputRef = useRef(null);

  // Load individuals for dropdown
  useEffect(() => {
    fetch('http://localhost:3001/individuals')
      .then((res) => res.json())
      .then((data) => setIndividuals(data))
      .catch(() => setError('Could not load individuals.'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault(); // prevents page reload

    setError(null);
    setSuccess(null);

    // Basic validation
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
      const response = await fetch('http://localhost:3001/sightings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSighting),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create sighting');
      }

      const created = await response.json();
      setSuccess('Sighting added successfully!');

      // Clear form
      setIndividualId('');
      setSightedAt('');
      setLocation('');
      setHealthy(true);
      setEmail('');

      nameInputRef.current.focus();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Sighting</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Location:</label>
        <input
          ref={nameInputRef}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <label>Date & Time:</label>
        <input
          type="datetime-local"
          value={sightedAt}
          onChange={(e) => setSightedAt(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <label>Healthy?</label>
        <select
          value={healthy}
          onChange={(e) => setHealthy(e.target.value === 'true')}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Individual:</label>
        <select
          value={individualId}
          onChange={(e) => setIndividualId(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select an animal</option>
          {individuals.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nickname || i.name} (ID {i.id})
            </option>
          ))}
        </select>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
