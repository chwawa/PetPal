import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard";
import "./Notification.css";


export default function Notification() {
    let navigate = useNavigate();
    const url = "http://127.0.0.1:8000"
    const [notifications, setNotifications] = useState([]);
    const accessToken = localStorage.getItem('access_token');
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`${url}/notifications?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            setNotifications(json.results)
            console.log(json.results)
        })
    }, [])

    return (
        <main>
            {notifications != []
                ? (<div className="notificationContainer">
                    {notifications.map(notification => (
                        <NotificationCard 
                            link={notification.link}
                            cardText={notification.message}
                            read={notification.is_read}
                            timeStamp={notification.creation_time}
                        />
                    ))}
                </div>)
                : <h2>No Notifications</h2>          
            }
        </main>
    )
}