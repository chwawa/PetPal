import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Card, CloseButton } from "react-bootstrap";
import "./NotificationCard.css"


export default function NotificationCard( {notifiID, link, message, read, timeStamp} ) {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000';
    const accessToken = localStorage.getItem('access_token');
    const [pet, setPet] = useState("");
    
    if (link.startsWith('/comments/shelter')) {
      var id = link.split('/')[3];
    } else {
      var id = link.split('/')[2];
    }
    
    const [error, setError] = useState(false)

    useEffect(() => {
      console.log(link,id)
      fetch(`${url}/pets/${id}/`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // 'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(json => {
        setPet(json)  
      })
      .catch(() => setError(true))
    }, [])

    const convertLink = (link) => {
      if (link.startsWith("/comments/shelter")) {
        return `/profile/${id}`
        
      } else if (link.startsWith("/comments")) {
        // `applications/:aid`
        return `/applications/${id}`

      } else if (link.startsWith("/applications")) {
        return `/applications/${id}`

      } else {
        // "pets/:species/:id"
        return `/pets/${pet.species}/${id}`
       
      }
    }
    
    const handleCardClick = () => {
        if (error) {
            navigate('/pagenotfound')
        } else if (link) {
            navigate(convertLink(link));
        }

        fetch(`${url}/notifications/${notifiID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
    }

    const deleteClick = (notifiID) => {
        fetch(`${url}/notifications/${notifiID}/`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            },
        })
        window.location.reload();
    }

    return (
      <Card className="notif-card" style={{ cursor: "pointer"}} >
      <Card.Body>
        {read ? null : <Badge className="unread" pill bg="warning" style={{fontSize:"1rem"}}>Unread</Badge>}
        <CloseButton className="cross" onClick={() => deleteClick(notifiID)}/>
        <Card.Text className="message" onClick={() => handleCardClick(notifiID)}>{message}</Card.Text>
        <Card.Text className="time" onClick={() => handleCardClick(notifiID)}>{timeStamp}</Card.Text>
        </Card.Body>
      </Card>
    );
}