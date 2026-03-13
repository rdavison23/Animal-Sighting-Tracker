import { useState } from 'react';
import IndividualsList from './components/views/IndividualsList';
import SightingsList from './components/views/SightingsList';
import SpeciesList from './components/views/SpeciesList';

function App() {
  const [view, setView] = useState('individuals');

  const navButtonStyle = (active) => ({
    background: active ? '#3b82f6' : '#334155',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'background 0.2s, transform 0.1s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* NAV BAR */}
      <header
        style={{
          background: '#1e293b',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}>
        <button
          onClick={() => setView('individuals')}
          style={navButtonStyle(view === 'individuals')}>
          Individuals
        </button>
        <button
          onClick={() => setView('sightings')}
          style={navButtonStyle(view === 'sightings')}>
          Sightings
        </button>
        <button
          onClick={() => setView('species')}
          style={navButtonStyle(view === 'species')}>
          Species
        </button>
      </header>

      {/* PAGE CONTAINER */}
      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '24px 16px 40px',
        }}>
        {view === 'individuals' && <IndividualsList />}
        {view === 'sightings' && <SightingsList />}
        {view === 'species' && <SpeciesList />}
      </main>
    </div>
  );
}

export default App;
