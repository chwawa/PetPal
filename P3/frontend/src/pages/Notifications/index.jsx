import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard";
import "./Notifications.css";


export default function Notification() {
    let navigate = useNavigate();
    const url = "http://127.0.0.1:8000"
    const [notifications, setNotifications] = useState([]);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        fetch(`${url}/notifications`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            setNotifications(json.results)
        })
    }, []);

    return (
        <main>
            { notifications != []
                ? (<div className="notificationContainer">                        
                        {notifications.map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notifiID={notification.id}
                                link={notification.link}
                                message={notification.message}
                                read={notification.is_read}
                                timeStamp={notification.creation_time}
                            />
                        ))}
                    </div>)
                : <h2>No Notifications.</h2>          
            }
        </main>)
}