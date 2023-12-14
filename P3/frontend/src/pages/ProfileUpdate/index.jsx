import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AreYouSureModal from '../../components/AreYouSureModal';

import './ProfileUpdate.css';

export default function ProfileUpdate() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [newPetListingPref, setNewPetListingPref] = useState('yes');
  const [profilePic, setProfilePic] = useState(null);
  const [picture, setPicture] = useState(false);
  const [errors, setErrors] = useState('');
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currUserId = localStorage.getItem('id');

    const fetchData = async () => {
      if (currUserId === id) {
        const accessToken = localStorage.getItem('access_token');
        try {
          const response = await fetch(`http://127.0.0.1:8000/accounts/user/${id}/profile/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.username);
            setName(userData.name);
            setEmail(userData.email);
            setPhone(userData.phone);
            setLocation(userData.location);
            setAbout(userData.about);
            setProfilePic(userData.profile_pic);
          } else {
            const errorData = await response.json();
            setErrors(errorData);
          }
        } catch (error) {
          navigate('*');
        }
      } else {
        navigate('*');
      }
    };

    fetchData();
  }, [id]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('repeat_password', repeatPassword);
    formData.append('new_pet_listing_pref', newPetListingPref);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('about', about);
    if (picture) {
      formData.append('profile_pic', profilePic);
    }
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/user/${id}/updation/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate(`/profile/${id}/`);
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      navigate('*');
    }
  };

  const handleRemoveProfilePic = () => {
    setProfilePic("");
    setPicture(true);
  };

  const handleProfilePicClick = () => {
    document.getElementById('profilePicInput').click();
    setPicture(true);
  };

  return (
    <main>
      <p className='back-nav' onClick={() => setShow(true)}>{'< Back'}</p>
      <AreYouSureModal 
                title="Are you sure you want to go back?"
                body="Your changes will be lost!"
                show={show}
                setShow={setShow}
      />

      <div className="profile-update-container">
        <div className="profile-update-box">
          <h2>Update Profile</h2>
          <form encType="multipart/form-data">
            <p className="error">{errors.non_field_errors}</p>

            <div className='profile-pic-container'>
              <img className="profile-pic-update" onClick={handleProfilePicClick} src={profilePic} alt="Profile" />
              <input
                id="profilePicInput"
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <div className='profile-pic-actions'>
                <button type="button" id="remove-button" onClick={handleRemoveProfilePic}>
                  Remove
                </button>
              </div>
              <p className="error">{errors.profile_pic}</p>
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
              <label htmlFor="newPetListingPref">New Pet Listings Preference:</label>
              <select id="newPetListingPref" onChange={(e) => setNewPetListingPref(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <p className="error">{errors.new_pet_listing_pref}</p>
            </div>
            <button className="update-button" onClick={handleProfileUpdate}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
