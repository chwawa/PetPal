import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageLayout from './components/PageLayout';
import Page404 from './pages/Page404';
import Landing from './pages/Landing';
import PetListings from './pages/PetListings/PetListings';
import MyPets from './pages/MyPets';
import MyApplications from './pages/MyApplications';
import ApplicationCreate from './pages/ApplicationCreate';
import ApplicationUpdate from './pages/ApplicationUpdate';
import ApplicationDetail from './pages/ApplicationDetail';
import PetDetail from './pages/PetDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShelterListings from './pages/ShelterListings';
// import InitialPageLayout from './components/InitialPageLayout';
import ProfileUpdate from './pages/ProfileUpdate';
import ProfileView from './pages/ProfileView';
import CreatePet from './pages/CreatePet';
import UpdatePet from './pages/UpdatePet';

import ShelterBlog from './pages/ShelterBlog/ShelterBlog';
import NewPost from './pages/NewPost/NewPost'; 

import Notification from './pages/Notifications';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />} >
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          
          <Route index element={<Landing />} />
          <Route path="pets/:species" element={<PetListings />} />
          <Route path="pets/:species/:id" element={<PetDetail />} />

          {/* change route depending on seeker or shelter */}
          <Route path="mypets/" element={<MyPets />} />

          <Route path="pets/:pid/application" element={<ApplicationCreate />} />
          <Route path="pets/:pid/application/update" element={<ApplicationUpdate />} />
          <Route path="applications/" element={<MyApplications />} />
          <Route path="applications/:aid" element={<ApplicationDetail />} />


          {/* SHELTER LINKS */}
          <Route path="mypets/new" element={<CreatePet />} />
          <Route path="mypets/:id" element={<UpdatePet />} />


          <Route path="blog/:id" element={<ShelterBlog />} />
          <Route path="blog/:id/newpost" element={<NewPost />} />

          <Route path="notifications" element={<Notification />}/>

          {/* SEEKER LINKS */}
          
          
          <Route path="shelters/" element={<ShelterListings />} />
          <Route path="profile/:id" element={<ProfileView />} />
          <Route path="profile/update/:id" element={<ProfileUpdate />} />
          
          <Route path="notifications" element={<Notification />}/>
        </Route>

        {/* <Route path="" element={<InitialPageLayout />} >
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
        </Route> */}
        
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
