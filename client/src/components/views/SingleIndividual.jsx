import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function SingleIndividual() {
  const { id } = useParams();
  const [individual, setIndividual] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/individuals/${id}`)
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
      <h2>Individual #{individual.id}</h2>
      <p>Nickname: {individual.nickname}</p>
      <p>Scientist: {individual.scientist_name}</p>
      <p>Species ID: {individual.species_id}</p>
    </div>
  );
}
