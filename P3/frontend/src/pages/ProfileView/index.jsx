import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './ProfileView.css';
import PetCard from '../../components/PetCard';
import ShelterComment from '../../components/ShelterComment';
import ShelterCommentCreation from '../../components/ShelterCommentCreation';
import { Card } from 'react-bootstrap';
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
      console.log(profilePic)
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
      <p className='back-nav' onClick={() => navigate(-1)}>{'< Back'}</p>
      {/* <div className="profile-update-container">
        <div className="profile-update-box"> */}
          <h2>{name}'s Profile</h2>
          <hr></hr>
          <img className='profile-image' src={profilePic} alt=""/>
          
          <Card style={{marginBottom: "30px"}}>
              <Card.Body>
                  {/* <Card.Title><h1>About</h1></Card.Title> */}
                  {/* <Card.Text>{pet.biography}</Card.Text> */}
                  <div className='info-grid'>
                      <b>Name</b>
                      <Card.Text>{name}</Card.Text>

                      <b>Email</b>
                      <Card.Text>{email}</Card.Text>

                      <b>Phone</b>
                      <Card.Text>{phone}</Card.Text>

                      <b>Location</b>
                      <Card.Text>{location}</Card.Text>

                      <b>About</b>
                      <Card.Text>{about}</Card.Text>
                  </div>
              </Card.Body>
          </Card>

          {/* <div className="form-group">
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
          </div> */}

          {isShelter && (
            <div className="form-group">
              <h3>Check Out Our Blog!</h3>
              <hr></hr>
              <div className='button-container'>
                <Button 
                  className='pink-button' 
                  size="lg" 
                  variant='light'
                  onClick={() => navigate(`/blog/${id}`)}
                >
                    Blog
                </Button>
              </div>
            </div>
          )}

          {isShelter && (
            <div className="form-group">
              <h3>Our Pets</h3>
              <hr></hr>
              <div className="pet-grid">
                {pets.length != 0 ? pets.map(pet => (
                  <>
                    <PetCard
                      key={pet.id}
                      petID={pet.id}
                      link={`/pets/${pet.species}/${pet.id}`}
                      cardImage={pet.picture}
                      cardTitle={pet.name}
                    />
                  </>
                )) : <p>No one's here!</p>}
              </div>
            </div>
          )}
          {isShelter && (
            <div className="form-group">
              <h3>Our Reviews</h3>
              <hr></hr>
              <div className="form-group">
                <StarRating rating={averageRating} />
              </div>
              <div className="comments-container">
                {comments.map((comment) => (
                  <ShelterComment key={comment.id} text={comment.text} commenter={comment.commenter} rating={comment.rating} />
                ))}
              </div>
              <p>
                {prev ? <Button className="nav-button" variant="light" onClick={() => setPage(page - 1)}>Previous</Button> : <Button className="nav-button" variant="light">Previous</Button>}
                {next ? <Button className="nav-button" variant="light" onClick={() => setPage(page + 1)}>Next</Button> : <Button className="nav-button" variant="light">Next</Button>}
              </p>
            </div>
          )}
          {isShelter && (
            <div className="form-group">
                <ShelterCommentCreation shelter={id} />
            </div>
          )}
        {/* </div>
      </div> */}
    </main>
  );
}
