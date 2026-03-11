import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleSighting() {
  const { id } = useParams();
  const [sighting, setSighting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/sightings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch sighting');
        return res.json();
      })
      .then((data) => setSighting(data))
      .catch(() => setError('Could not load sighting.'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!sighting) return <p>Loading...</p>;

  return (
    <div>
      <h2>Sighting #{sighting.id}</h2>
      <p>Location: {sighting.location}</p>
      <p>Date: {new Date(sighting.sighted_at).toLocaleString()}</p>
      <p>Healthy: {sighting.healthy ? 'Yes' : 'No'}</p>
    </div>
  );
}
