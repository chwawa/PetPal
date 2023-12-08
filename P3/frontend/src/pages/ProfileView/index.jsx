import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './ProfileView.css';
import PetCard from '../../components/PetCard';
import ShelterComment from '../../components/ShelterComment';
import ShelterCommentCreation from '../../components/ShelterComment';

export default function PetDetail() {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [pets, setPets] = useState([]);
  const [comments, setComments] = useState([]);
  const [isShelter, setIsShelter] = useState(false);
  const url = 'http://127.0.0.1:8000'; // change after deployment
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    fetch(`${url}/accounts/user/${id}/profile/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) {
        navigate('*');
      }
      return res.json();
    })
    .then(json => {
      if (json.user_type === 'shelter') {
        setIsShelter(true);
      }
      setUsername(json.username);
      setName(json.name);
      setEmail(json.email);
      setPhone(json.phone);
      setLocation(json.location);
      setAbout(json.about);
      setProfilePic(json.profile_pic);
      fetchPets();
      fetchComments();
      console.log("Value:" + isShelter);
    });
  }, [id]);

  const fetchPets = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${url}/pets/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allPets = await response.json();
        const filteredPets = allPets.results.filter(pet => pet.shelter === parseInt(id, 10));
        setPets(filteredPets);
      } else {
        throw new Error('Failed to fetch user pets');
      }
    } catch (error) {
      setPets([]);
    }
  };

  const fetchComments = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${url}/comments/shelter/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allComments = await response.json();
        setComments(allComments.results);
      } else {
        throw new Error('Failed to fetch shelter comments');
      }
    } catch (error) {
      setComments([]);
    }
  };

  return (
    <main>
      <div className="profile-update-container">
        <div className="profile-update-box">
          <h2>Profile View</h2>
          <img src={profilePic} alt="Avatar"/>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={phone} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={location} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="about">About:</label>
            <textarea id="about" value={about} readOnly />
          </div>
          {isShelter && (
            <div className="form-group">
              <h3>Your Pets</h3>
              <div className="pet-cards-container">
                {pets.map(pet => (
                  <PetCard
                    key={pet.id}
                    petID={pet.id}
                    link={`/pets/${pet.id}`}
                    cardImage={pet.picture}
                    cardTitle={pet.name}
                    cardSubtitle={`Species: ${pet.species}`}
                    cardText={`Breed: ${pet.breed}`}
                    actionButtons={<button>View Details</button>}
                  />
                ))}
              </div>
            </div>
          )}
          {isShelter && (
            <div className="form-group">
              <div className="comments-container">
                {comments.map((comment) => (
                  <ShelterComment key={comment.id} text={comment.text} commenter={comment.commenter} />
                ))}
              </div>
            </div>
          )}
          {isShelter && (
            <ShelterCommentCreation shelter={id} />
          )}
        </div>
      </div>
    </main>
  );
}
