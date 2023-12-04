import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Page404 from './pages/Page404';
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
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
