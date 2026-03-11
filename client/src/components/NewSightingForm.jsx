import { useState } from 'react';

export default function NewSightingForm() {
  // State for each form field
  const [individualId, setIndividualId] = useState('');
  const [sightedAt, setSightedAt] = useState('');
  const [location, setLocation] = useState('');
  const [healthy, setHealthy] = useState(true);
  const [email, setEmail] = useState('');
}

// State for message

const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

async function handleSubmit(e) {
  e.preventDefault(); // prevents page reload

  setError(null);
  setSuccess(null);

  if (!individualId || !sightedAt || !location || !email) {
    setError('Please fill in all required fields.');
    return;
  }
}
return (
  <form>
    <h2>New Sighting</h2>

    <label>
      Location:{' '}
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />{' '}
    </label>
    <p>You typed: {location}</p>
  </form>
);
