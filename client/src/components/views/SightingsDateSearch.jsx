import { useState } from 'react';

export default function SightingsDateSearch({ onResults }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);

    console.log(
      'FETCHING:',
      `${API_BASE}/sightings/search?start=${start}&end=${end}`
    );

    // Validate both dates exist
    if (!start || !end) {
      setError('Please select both start and end dates.');
      return;
    }

    // Validate start <= end
    if (new Date(start) > new Date(end)) {
      setError('Start date cannot be after end date.');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/sightings/search?start=${start}&end=${end}`
      );

      console.log('RESPONSE STATUS:', response.status);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Search failed');
      }

      const results = await response.json();
      onResults(results);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
      <h3>Search Sightings by Date Range</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Start Date:
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </label>

      <label style={{ marginLeft: '10px' }}>
        End Date:
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </label>

      <button type="submit" style={{ marginLeft: '10px' }}>
        Search
      </button>
    </form>
  );
}
