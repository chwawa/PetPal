
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';

import "./PetDetail.css"

export default function PetDetail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [pet, setPet] = useState("");
    const seekerID = localStorage.getItem('id');
    const accessToken = localStorage.getItem('access_token');
    const [application, setApplication] = useState([]);
    const [notApplied, setNotApplied] = useState(true);
    const [applied, setApplied] = useState(false);

    const url = 'http://127.0.0.1:8000' // change after deployment

    useEffect(() => {
        fetch(`${url}/pets/${id}`)
        .then(res => res.json())
        .then(json => {
            setPet(json);
        })

        fetch(`${url}/applications/applications/?applicant=${seekerID}&pet=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            setApplication(json.results);
            if (json.results.length != 0) {
                setNotApplied(false);
                setApplied(true);
            }
        })
    }, []);



    return (
        <main>
            <p className='back-nav' onClick={() => navigate(-1)}>{'< Back'}</p>
            <div className="pet-detail-grid">
                <Card>
                    <Card.Body>
                        <Card.Title><h1>Meet {pet.name}!</h1></Card.Title>
                        <Card.Subtitle style={{ marginBottom: 10 }}>
                            {pet.status == "available" 
                                ? <Badge bg="success">Active</Badge>
                                : <Badge bg="secondary">Unactive</Badge>}
                        </Card.Subtitle>
                        <Card.Img className='pet-pic' src={pet.picture} />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title><h1>About</h1></Card.Title>
                        <Card.Text>{pet.biography}</Card.Text>
                        <div className='info-grid'>
                            <b>Breed</b>
                            <Card.Text>{pet.breed}</Card.Text>

                            <b>Gender</b>
                            <Card.Text>{pet.gender}</Card.Text>

                            <b>Size</b>
                            <Card.Text>{pet.size}</Card.Text>

                            <b>Colour</b>
                            <Card.Text>{pet.colour}</Card.Text>

                            <b>Age</b>
                            <Card.Text>{pet.age}</Card.Text>

                            <b>Location</b>
                            <Card.Text>{pet.location}</Card.Text>

                        </div>

                        <div className='button-container'>
                            <Button variant='light' onClick={() => navigate(`/profile/${pet.shelter}`)}>View Shelter</Button>
                            
                            {notApplied && (
                                <Button variant='light' onClick={() => navigate(`/pets/${pet.id}/application`)} className='adopt-button'>Adopt</Button>
                            )}

                            {applied && (
                                <Button variant='light' onClick={() => navigate(`/applications/${application[0].id}`)} className='adopt-button'>View Application</Button>
                            )}
                            
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
        </main>
    )
}