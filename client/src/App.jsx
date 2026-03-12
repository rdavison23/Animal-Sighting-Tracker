import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SightingsList from './components/views/SightingsList';
import SingleSighting from './components/views/SingleSighting';
import IndividualsList from './components/views/IndividualsList';
import SpeciesList from './components/views/SpeciesList';
import SingleIndividual from './components/views/SingleIndividual';

import NewSightingForm from './components/forms/NewSightingForm';
import NewIndividualForm from './components/forms/NewIndividualForm';
import NewSpeciesForm from './components/forms/NewSpeciesForm';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Sightings */}
        <Route path="/" element={<SightingsList />} />
        <Route path="/sightings/:id" element={<SingleSighting />} />
        <Route path="/new-sighting" element={<NewSightingForm />} />
        <Route path="/sightings" element={<SightingsList />} />

        {/* Individuals */}
        <Route path="/individuals" element={<IndividualsList />} />
        <Route path="/individuals/new" element={<NewIndividualForm />} />
        <Route path="/individuals/:id" element={<SingleIndividual />} />

        {/* Species */}
        <Route path="/species" element={<SpeciesList />} />
        <Route path="/species/new" element={<NewSpeciesForm />} />
      </Routes>
    </Router>
  );
}
