import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Card, CloseButton } from "react-bootstrap";
import "./NotificationCard.css"


export default function NotificationCard( {notifiID, link, message, read, timeStamp}) {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000';
    const accessToken = localStorage.getItem('access_token');
    
    const handleCardClick = () => {
        if (link) {
            navigate(link);
        }
        fetch(`${url}/notifications/${notifiID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
    }

    async function deleteClick (notifiID) {
        await fetch(`${url}/notifications/${notifiID}/`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
        })
        window.location.reload();
    }

    return (
      <Card className="card" style={{ cursor: "pointer"}} >
      <Card.Body>
        {read ? null : <Badge className="unread" pill bg="warning" style={{fontSize:"1rem"}}>Unread</Badge>}
        <CloseButton className="cross" onClick={() => deleteClick(notifiID)}/>
        <Card.Text className="message" onClick={() => handleCardClick(notifiID)}>{message}</Card.Text>
        <Card.Text className="time" onClick={() => handleCardClick(notifiID)}>{timeStamp}</Card.Text>
        </Card.Body>
      </Card>
    );
}