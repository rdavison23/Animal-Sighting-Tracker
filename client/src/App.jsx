import { useState } from 'react';
import './App.css';
import IndividualsList from './components/views/IndividualsList';
import SightingsList from './components/views/SightingsList';
import SpeciesList from './components/views/SpeciesList';

function App() {
  const [view, setView] = useState('individuals');

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* NAV BAR */}
      <header className="navbar">
        <button
          onClick={() => setView('individuals')}
          className={`nav-btn ${view === 'individuals' ? 'active' : ''}`}>
          Individuals
        </button>

        <button
          onClick={() => setView('sightings')}
          className={`nav-btn ${view === 'sightings' ? 'active' : ''}`}>
          Sightings
        </button>

        <button
          onClick={() => setView('species')}
          className={`nav-btn ${view === 'species' ? 'active' : ''}`}>
          Species
        </button>
      </header>

      {/* PAGE CONTAINER */}
      <main className="page-container">
        {view === 'individuals' && <IndividualsList />}
        {view === 'sightings' && <SightingsList />}
        {view === 'species' && <SpeciesList />}
      </main>
    </div>
  );
}

export default App;
