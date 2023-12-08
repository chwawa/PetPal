
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
    const url = 'http://127.0.0.1:8000' // change after deployment

    useEffect(() => {
        fetch(`${url}/pets/${id}`)
        .then(res => res.json())
        .then(json => {
            setPet(json);
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
                        <Card.Img style={{height: "50vh"}} src={pet.picture} />
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
                            <Button variant='light'>View Shelter</Button>
                            <Button variant='light' className='adopt-button'>Adopt</Button>
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
        </main>
    )
}