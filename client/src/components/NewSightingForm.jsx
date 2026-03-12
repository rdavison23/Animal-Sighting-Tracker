// frontend/src/components/NewSightingForm.jsx
import { useState } from 'react';

export default function NewSightingForm() {
  // State for each form field
  const [individualId, setIndividualId] = useState('');
  const [sightedAt, setSightedAt] = useState('');
  const [location, setLocation] = useState('');
  const [healthy, setHealthy] = useState(true);
  const [email, setEmail] = useState('');

  // State for messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    } catch (err) {
      setError(err.message);
    }
  }
}
