
import Card from 'react-bootstrap/Card';

import "./PetCard.css"

function PetCard( { cardImage, cardTitle, cardText } ) {
  return (
    <Card style={{ cursor: "pointer"}}>
      <Card.Img className="card-img-top" variant="top" src={cardImage} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
