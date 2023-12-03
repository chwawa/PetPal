import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import PetListings from './pages/PetListings/PetListings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Landing />} />
          <Route path="pets/:species" element={<PetListings />} />
        </Route>
      </Routes>
      
    
    </BrowserRouter>
  );
}

export default App;
