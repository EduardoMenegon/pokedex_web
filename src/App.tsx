import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonScreen from './pages/Pokedex/PokemonScreen';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PokemonScreen />} />
    </Routes>
  </Router>
);

export default App;
