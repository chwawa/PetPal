import React, { useState, useEffect } from 'react';
import './ShelterCommentCreation.css'

export default function ShelterCommentCreation({ shelter }) {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const userId= localStorage.getItem('id');
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/accounts/user/${userId}/profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
          console.log(name);
          setProfilePic(userData.profile_pic);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [shelter]);

  const handlePostComment = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/comments/shelter/${shelter}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commenter: userId,
          shelter: shelter,
          text: commentText,
        }),
      });

      if (response.ok) {
        setCommentText('');
      } else {
        console.error('Error posting comment:', response.status);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className='commentContainer'>
      {profilePic && <img src={profilePic} alt={`${name}'s profile pic`} />}
      <div className='userInfo'>
        <p>{name}</p>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
        <button onClick={handlePostComment}>Post</button>
      </div>
    </div>
  );
}

