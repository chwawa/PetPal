import React, { useState, useEffect } from 'react';
import './ShelterComment.css'; 

export default function ShelterComment({ commenter, text, rating }) {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`http://127.0.0.1:8000/accounts/user/${commenter}/profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
          setProfilePic(userData.profile_pic);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='commentContainer'>
      {profilePic && <img src={profilePic} alt={`${name}'s profile pic`} />}
      <div className='userInfo'>
        <p id="name">{name}</p>
        <div className="rating-container">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={index < rating ? 'star-filled' : 'star-empty'}
            >
              ★
            </span>
          ))}
        </div>
        <p className='commentText'>{text}</p>
      </div>
    </div>
  );
}



