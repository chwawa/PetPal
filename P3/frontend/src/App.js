import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageLayout from './components/PageLayout';
import Page404 from './pages/Page404';
import Landing from './pages/Landing';
import PetListings from './pages/PetListings/PetListings';
import MyPets from './pages/MyPets';
import MyApplications from './pages/MyApplications';
import PetDetail from './pages/PetDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route index element={<Landing />} />
          <Route path="pets/:species" element={<PetListings />} />
          <Route path="pets/:species/:id" element={<PetDetail />} />

          {/* change route depending on seeker or shelter */}
          <Route path="mypets/" element={<MyPets />} />
          {/* <Route path="mypets/" element={<MyApplications />} /> */}
          
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
