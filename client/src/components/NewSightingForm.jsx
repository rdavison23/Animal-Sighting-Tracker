import { useState } from 'react';

export default function NewSightingForm() {
  const [location, setLocation] = useState('');
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
