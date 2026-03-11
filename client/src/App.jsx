import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SightingsList from './components/SightingsList';
import SingleSighting from './components/SingleSighting';
import NewSightingForm from './components/NewSightingForm';

import IndividualsList from './components/IndividualsList';
import SingleIndividual from './components/SingleIndividual';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Sightings */}
        <Route path="/" element={<SightingsList />} />
        <Route path="/sightings/:id" element={<SingleSighting />} />
        <Route path="/new-sighting" element={<NewSightingForm />} />

        {/* Individuals */}
        <Route path="/individuals" element={<IndividualsList />} />
        <Route path="/individuals/:id" element={<SingleIndividual />} />
      </Routes>
    </Router>
  );
}
