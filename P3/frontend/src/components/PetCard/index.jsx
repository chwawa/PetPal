
import Card from 'react-bootstrap/Card';

import "./PetCard.css"
import { useNavigate } from 'react-router-dom';

function PetCard( { petID, link, cardImage, cardTitle, cardSubtitle, cardText, actionButtons } ) {
  let navigate = useNavigate();
  return (
    <Card style={{ cursor: "pointer", marginBottom:'20px'}} onClick={() => navigate(link)}>
      <Card.Img className="card-img-top" variant="top" src={cardImage} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Subtitle>{cardSubtitle}</Card.Subtitle>
        <Card.Text>{cardText}</Card.Text>
        {actionButtons}
      </Card.Body>
    </Card>
  );
}

export default PetCard;
