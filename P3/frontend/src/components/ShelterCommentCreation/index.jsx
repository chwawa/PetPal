import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShelterCommentCreation.css';
import { Button } from 'react-bootstrap';

const ShelterCommentCreation = ({ shelter }) => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0); 
  const navigate = useNavigate();
  const url = 'http://127.0.0.1:8000'; 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const id = localStorage.getItem('id');

        const response = await fetch(`${url}/accounts/user/${id}/profile/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          navigate('*');
          return;
        }

        const json = await response.json();
        setName(json.name);
        setProfilePic(json.profile_pic);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate, url]);

  const handlePostComment = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = localStorage.getItem('id');
      const response = await fetch(`http://127.0.0.1:8000/comments/shelter/${shelter}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commenter: userId,
          shelter: shelter,
          text: commentText,
          rating: rating
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
      {profilePic && <img className="profile-pic" src={profilePic} alt={`${name}'s profile pic`} />}
      <div className='userInfo'>
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'star-filled' : 'star-empty'}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
        <Button className="pink-button" variant="light" onClick={handlePostComment}>Post</Button>
      </div>
    </div>
  );
};

export default ShelterCommentCreation;



