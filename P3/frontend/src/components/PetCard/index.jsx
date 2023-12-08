
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import AreYouSureModal from '../AreYouSureModal';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import "./PetCard.css"
import { useNavigate } from 'react-router-dom';

function PetCard( { petID, link, cardImage, cardTitle, cardSubtitle, cardText, actionButtons } ) {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleCardClick = () => {
    if (link) {
      navigate(link)
    }
  }

  return (
    <>
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
                <Button size="sm" style={{ marginRight: 5, marginBottom: 5 }} variant="warning" onClick={() => console.log('hi')}>View Apps</Button>
                <Button size="sm" style={{ marginBottom: 5 }} variant="light" onClick={() => navigate(`/mypets/${petID}`)}>Edit</Button>
                <FontAwesomeIcon icon={faTrashCan} className='trash float-right' onClick={() => setShow(true) }/>
              </>
            : null}
        </Card.Body>
      </Card>
    </>
  );
}

export default PetCard;
