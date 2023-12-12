
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button"
import PetCard from "../../components/PetCard";

import "./MyPets.css"

export default function MyPets() {
    let navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const shelterID = localStorage.getItem('id');

    useEffect(() => {
        fetch(`${url}/pets/?shelter=${shelterID}`)
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setPets(json.results);
        })
        .catch((e) => console.log(`Error: ${e}`))
    }, []);

    return (
        <main>
            <h2>Create a New Listing:</h2>
            <hr class="solid"></hr>

            <div className="button-container">
                <Button 
                    variant="light" 
                    className="new-listing-button" 
                    size="lg"
                    onClick={() => navigate('/mypets/new')}
                >
                    Create Pet
                </Button>
            </div>

            <h2>My Pets:</h2>
            <hr class="solid"></hr>

            <div className="listings">
                { pets.map(pet => (
                    <PetCard 
                        key={pet.id}
                        petID={pet.id}
                        cardImage={pet.picture} 
                        cardTitle={pet.name}
                        cardSubtitle={pet.breed + ' • ' + pet.age + ' y/o'} 
                        cardText={pet.biography} 
                        actionButtons={true}
                    />
                ))}
            </div>

        </main>
    )
}