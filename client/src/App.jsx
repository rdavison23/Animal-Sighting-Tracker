import { useState } from 'react';
import IndividualsList from './components/views/IndividualsList';
import SightingsList from './components/views/SightingsList';
import SpeciesList from './components/views/SpeciesList';

function App() {
  const [view, setView] = useState('individuals');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* NAVIGATION BAR */}
      <header
        style={{
          background: '#1e293b',
          padding: '15px 20px',
          borderRadius: '10px',
          marginBottom: '25px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}>
        <button
          onClick={() => setView('individuals')}
          style={{
            background: view === 'individuals' ? '#3b82f6' : '#334155',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            transition: '0.2s',
          }}>
          Individuals
        </button>

        <button
          onClick={() => setView('sightings')}
          style={{
            background: view === 'sightings' ? '#3b82f6' : '#334155',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            transition: '0.2s',
          }}>
          Sightings
        </button>

        <button
          onClick={() => setView('species')}
          style={{
            background: view === 'species' ? '#3b82f6' : '#334155',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            transition: '0.2s',
          }}>
          Species
        </button>
      </header>

      {/* MAIN CONTENT */}
      {view === 'individuals' && <IndividualsList />}
      {view === 'sightings' && <SightingsList />}
      {view === 'species' && <SpeciesList />}
    </div>
  );
}

export default App;
