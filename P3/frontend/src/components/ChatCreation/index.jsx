import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatCreation.css';

const ChatCreation = ({ application }) => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [commentText, setCommentText] = useState('');
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
      const response = await fetch(`http://127.0.0.1:8000/comments/application/${application}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commenter: userId,
          application: application,
          text: commentText,
        }),
      });

      if (response.ok) {
        setCommentText('');
      } else {
        console.error('Error sending message:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='commentContainer'>
      {profilePic && <img className="profile-pic" src={profilePic} alt={`${name}'s profile pic`} />}
      <div className='userInfo'>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={handlePostComment}>Send</button>
      </div>
    </div>
  );
};

export default ChatCreation;



