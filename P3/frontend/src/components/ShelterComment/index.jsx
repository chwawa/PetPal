import React, { useState, useEffect } from 'react';
import './ShelterComment.css'; // Adjust the path based on your project structure

export default function ShelterCommentCreation({ commenter, text }) {
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
        <p className='commentText'>{text}</p>
      </div>
    </div>
  );
}
