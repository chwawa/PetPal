import { useEffect, useState } from "react";
import { Dropdown, Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NotificationCard from "../../components/NotificationCard";
import "./Notifications.css";


export default function Notification() {
    const url = "http://127.0.0.1:8000"
    const accessToken = localStorage.getItem('access_token');
    const [notifications, setNotifications] = useState([]);
    
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("latest");

    useEffect(() => {
        fetch(`${url}/notifications/?order=${sort}&filter=${filter}&page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            setNotifications(json.results);
            setTotalPages(Math.ceil(json.count / 4));
        })
    }, [filter, sort, page]);

    return (
        <main>
            <div className="dropdowns">
                <Container style={{padding:0}}>
                    <Row xs="auto">
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="sort-button"
                                    variant="light"
                                    id="search-filters"   
                                >
                                    Filter by: {filter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setFilter("read")}>Read</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFilter("unread")}>Unread</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="sort-button"
                                    variant="light"
                                    id="search-filters"   
                                >
                                    Sort by: {sort}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSort("latest")}>Latest</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSort("oldest")}>Oldest</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Container>
            </div>


                
            {notifications.length !== 0
            ? (
            <div className="notificationContainer">
                <div>
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
                </div>
                <p>
                { page > 1 ?
                    <button className="nav-button" variant="light" onClick={() => setPage(page - 1)}>Previous</button>
                    : <></>}
                { page < totalPages ?
                    <button className="nav-button" variant="light" onClick={() => setPage(page + 1)}>Next</button>
                    :<></>}
                </p>
                <p>Page {page} out of {totalPages}</p></div>
                )
            : <h2>No notification here!</h2>}
        </main>)
}