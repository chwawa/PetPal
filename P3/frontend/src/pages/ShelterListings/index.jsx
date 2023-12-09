import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css'; // code will run if you comment this line out

import './ShelterListing.css'
import ShelterItem from "../../components/ShelterItem";

 export default function ShelterListings() {
    const [shelters, setShelters] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext]  = useState(true);
    const [prev, setPrev] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        fetch(`http://127.0.0.1:8000/accounts/list/shelters/?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                setShelters(json.results);
                setNext(json.next);
                setPrev(json.previous) 
            })
    }, [page]);

    const handleShelterClick = (shelterId) => {
        navigate(`/profile/${shelterId}`);
    };

    return (
        <main class="container">
            <div className="shelter-listings-container">
                {shelters.map((shelter) => (
                    <ShelterItem
                        key={shelter.id}
                        profile={shelter.profile_pic}
                        name={shelter.name}
                        about={shelter.about}
                        email={shelter.email}
                        phone={shelter.phone}
                        location={shelter.location}
                        link={`/profile/${shelter.id}`}
                    />
                ))}
            <p>
                {prev ? <button onClick={() => setPage(page - 1)}>Previous</button> : <button>Previous</button>}
                {next ? <button onClick={() => setPage(page + 1)}>Next</button> : <button>Next</button>}
            </p>
        </div>
        </main>
    );
}

