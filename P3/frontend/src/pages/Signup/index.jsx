import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

export default function Signup() {
  const [username, setUsername] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [userType, setUserType] = useState('seeker');
  const [newPetListingPref, setNewPetListingPref] = useState('yes');
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('repeat_password', repeatPassword);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('about', about);
    formData.append('user_type', userType);
    formData.append('new_pet_listing_pref', newPetListingPref);
    if (profilePic) {
      formData.append('profile_pic', profilePic);
    }

    const response = await fetch('http://127.0.0.1:8000/accounts/user/creation/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      navigate('/login'); 
    } else {
      const errorData = await response.json();
      setErrors(errorData);
    }
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-box">
          <h2>Sign Up</h2>
          <form>
            <p className="error">{errors.non_field_errors}</p>
            <div className="form-group extend">
              <div className="radio-option">
                <input
                  type="radio"
                  id="seeker"
                  value="seeker"
                  checked={userType === 'seeker'}
                  onChange={() => setUserType('seeker')}
                />
                <label htmlFor="seeker">Pet Seeker</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="shelter"
                  value="shelter"
                  checked={userType === 'shelter'}
                  onChange={() => setUserType('shelter')}
                />
                <label htmlFor="shelter">Pet Shelter</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <p className="error">{errors.username}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
              <p className="error">{errors.password}</p>
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <input type="password" id="repeatPassword" onChange={(e) => setRepeatPassword(e.target.value)} />
              <p className="error">{errors.repeat_password}</p>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <p className="error">{errors.name}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="error">{errors.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <p className="error">{errors.phone}</p>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <p className="error">{errors.location}</p>
            </div>
            <div className="form-group">
              <label htmlFor="about">About:</label>
              <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} />
              <p className="error">{errors.about}</p>
            </div>
            <div className="form-group">
              <label htmlFor="profilePic">Profile Picture:</label>
              <input type="file" id="profilePic" onChange={(e) => setProfilePic(e.target.files[0])} />
              <p className="error">{errors.profile_pic}</p>
            </div>
            <div className="form-group">
              <label htmlFor="newPetListingPref">New Pet Listings Preference:</label>
              <select id="newPetListingPref" onChange={(e) => setNewPetListingPref(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <p className="error">{errors.new_pet_listing_pref}</p>
            </div>
            <button className="loginbutton" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </main>
  );
}
