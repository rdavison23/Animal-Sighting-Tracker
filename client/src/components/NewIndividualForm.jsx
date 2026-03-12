import { useState } from 'react';

export default function NewIndividualForm() {
  // Form fields
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');

  // Messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    } catch (err) {
      setError(err.message);
    }
  }
}
