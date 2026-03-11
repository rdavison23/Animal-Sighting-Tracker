import { useEffect, useState } from 'react';

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/species')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch species');
        }
        return res.json();
      })
      .then((data) => {
        setSpecies(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load species.');
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (species.length === 0) {
    return <p>No species found.</p>;
  }
}
