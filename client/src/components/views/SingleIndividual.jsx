import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleIndividual() {
  const { id } = useParams();
  const [individual, setIndividual] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/individuals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch individual');
        return res.json();
      })
      .then((data) => setIndividual(data))
      .catch(() => setError('Could not load individual.'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!individual) return <p>Loading...</p>;

  return (
    <div>
      <h2>{individual.name}</h2>
      <p>Species: {individual.species}</p>
      <p>Age: {individual.age}</p>
    </div>
  );
}
