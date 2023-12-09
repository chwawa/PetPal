import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Card, CloseButton } from "react-bootstrap";
import "./NotificationCard.css"


export default function NotificationCard( link, cardText, read, timeStamp) {
    let navigate = useNavigate();
    
    const handleCardClick = () => {
        if (link) {
            navigate(link);
            read = true;
        }
    }

    return (
      <Card onClick={() => handleCardClick()} style={{ cursor: "pointer"}}>
      <Card.Body>
        {read ? null : <Badge pill bg="warning">New</Badge>}
        <CloseButton />
        <Card.Text>{cardText}</Card.Text>
        <Card.Text>{timeStamp}</Card.Text>
        </Card.Body>
      </Card>
    );
}