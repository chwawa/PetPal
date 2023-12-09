import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './ProfileView.css';
import PetCard from '../../components/PetCard';
import ShelterComment from '../../components/ShelterComment';
import ShelterCommentCreation from '../../components/ShelterCommentCreation';

import { Button } from 'react-bootstrap';

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
  const [averageRating, setAverageRating] = useState(0);
  const [page, setPage] = useState(1);
  const [next, setNext]  = useState(true);
  const [prev, setPrev] = useState(true);
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
  }, [id, page]);

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
      const response = await fetch(`${url}/comments/shelter/${id}/?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allComments = await response.json();
        const averageRating = allComments.results.reduce((sum, comment) => sum + comment.rating, 0) / allComments.results.length;
        setAverageRating(averageRating);
        setComments(allComments.results);
        setNext(allComments.next);
        setPrev(allComments.previous) 
      } else {
        throw new Error('Failed to fetch shelter comments');
      }
    } catch (error) {
      setComments([]);
    }
  };

  const StarRating = ({ rating }) => {
    const starStyle = {
      fontSize: '24px',
      marginRight: '4px', 
    };
  
    return (
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star-filled' : 'star-empty'}
            style={starStyle}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <main>
      <div className="profile-update-container">
        <div className="profile-update-box">
          <h2>Profile View</h2>
          <img className='profile-image' src={profilePic} alt="Avatar"/>
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

          <div className="form-group">
            <h3>Check Out Our Blog!</h3>
            <Button 
              className='pink-button center' 
              size="lg" 
              variant='light'
              onClick={() => navigate(`/blog/${id}`)}
            >
                Blog
              </Button>
          </div>

          {isShelter && (
            <div className="form-group">
              <h3>Our Pets</h3>
              <div className="pet-cards-container">
                {pets.map(pet => (
                  <>
                    <PetCard
                      key={pet.id}
                      petID={pet.id}
                      link={`/pets/${pet.id}`}
                      cardImage={pet.picture}
                      cardTitle={pet.name}
                      // actionButtons={<button>View Details</button>}
                    />
                    <br></br>
                  </>
                ))}
              </div>
            </div>
          )}
          {isShelter && (
            <div className="form-group">
              <h3>Our Reviews</h3>
              <div className="form-group">
                <StarRating rating={averageRating} />
              </div>
              <div className="comments-container">
                {comments.map((comment) => (
                  <ShelterComment key={comment.id} text={comment.text} commenter={comment.commenter} rating={comment.rating} />
                ))}
              </div>
              <p>
                {prev ? <button onClick={() => setPage(page - 1)}>Previous</button> : <button>Previous</button>}
                {next ? <button onClick={() => setPage(page + 1)}>Next</button> : <button>Next</button>}
              </p>
            </div>
          )}
          {isShelter && (
            <div className="form-group">
                <ShelterCommentCreation shelter={id} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
