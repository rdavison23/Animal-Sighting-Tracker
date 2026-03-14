import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SightingsList from './components/views/SightingsList';
import SingleSighting from './components/views/SingleSighting';
import NewSightingForm from './components/forms/NewSightingForm';

import IndividualsList from './components/views/IndividualsList';
import SingleIndividual from './components/views/SingleIndividual';

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
