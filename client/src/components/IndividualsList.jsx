import { useEffect, useState } from 'react';

export default function IndividualsList() {
  const [individuals, setIndividuals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/individuals')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch individuals');
        }
        return res.json();
      })
      .then((data) => {
        setIndividuals(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load individuals.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (individuals.length === 0) {
    return <p>No individuals found.</p>;
  }

  return (
    <div>
      <h2>All Individuals</h2>
      {individuals.map((ind) => (
        <div key={ind.id} style={{ marginBottom: '12px' }}>
          <p>
            <strong>Name:</strong> {ind.name}
          </p>
          <p>
            <strong>Species:</strong> {ind.species}
          </p>
          <p>
            <strong>Age:</strong> {ind.age}
          </p>
        </div>
      ))}
    </div>
  );
}
