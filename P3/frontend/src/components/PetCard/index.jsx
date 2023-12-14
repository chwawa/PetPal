
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import AreYouSureModal from '../AreYouSureModal';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import "./PetCard.css"
import { useNavigate } from 'react-router-dom';

function PetCard( { petID, link, cardImage, cardTitle, cardSubtitle, cardText, actionButtons, aButton, aID } ) {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const handleCardClick = () => {
    if (!accessToken) {
      setShowLoginModal(true);
    } else if (link) {
      navigate(link)
    }
  }

  return (
    <>
      <Modal
        show={showLoginModal}
        setShow={setShowLoginModal}
      >
        <Modal.Header closeButton>
            <Modal.Title>Hi!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must be logged in to adopt pets.</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            <Button variant="light" className="pink-button" onClick={() => navigate("/login")}>Log In / Sign Up</Button>
        </Modal.Footer>
      </Modal>

      <AreYouSureModal 
        title={`Delete ${cardTitle}?`} 
        body="They'll be gone forever!"
        show={show} 
        setShow={setShow} 
        petID={petID}
      />

      <Card style={{ cursor: "pointer"}} onClick={() => handleCardClick()}>
        <Card.Img className="card-img-top" src={cardImage} />
        <Card.Body>
          <Card.Title>{cardTitle}</Card.Title>
          <Card.Subtitle>{cardSubtitle}</Card.Subtitle>
          <Card.Text>{cardText}</Card.Text>
          {actionButtons 
            ? <>
                <Button size="sm" style={{ marginRight: 5, marginBottom: 5 }} variant="warning" onClick={() => navigate(`${petID}/applications`)}>View Applications</Button>
                <Button size="sm" style={{ marginBottom: 5 }} variant="light" onClick={() => navigate(`/mypets/${petID}`)}>Edit</Button>
                <FontAwesomeIcon icon={faTrashCan} className='trash float-right' onClick={() => setShow(true) }/>
              </>
            : null}
            {aButton 
            ? <>
                <Button size="sm" style={{ marginBottom: 5 }} variant="light" onClick={() => navigate(`/applications/${aID}/`)}>View</Button>
                <Button size="sm" style={{ marginBottom: 5 }} variant="light" onClick={() => navigate(`/applications/${aID}/update`)}>Update</Button>
              </>
            : null}
        </Card.Body>
      </Card>
    </>
  );
}

export default PetCard;
