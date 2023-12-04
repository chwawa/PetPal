
import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button"
import PetCard from "../../components/PetCard";
import MyPetsActionButtons from "../../components/MyPetsActionButtons";


import "./MyPets.css"

export default function MyPets() {
    const [pets, setPets] = useState([]);
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const shelterID = 1; // change to current shelter

    useEffect(() => {
        fetch(`${url}/pets/?shelter=${shelterID}`)
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setPets(json.results);
        })
    }, []);

    return (
        <main>
            <h2>Create a New Listing:</h2>
            <hr class="solid"></hr>

            <div className="button-container">
                <Button variant="light" className="new-listing-button" size="lg">Create Pet</Button>
            </div>

            <h2>My Pets:</h2>
            <hr class="solid"></hr>

            <div className="listings">
                { pets.map(pet => (
                    <PetCard 
                        cardImage={pet.picture} 
                        cardTitle={pet.name}
                        cardSubtitle={pet.breed + ' • ' + pet.age + ' y/o'} 
                        cardText={pet.biography} 
                        actionButtons={<MyPetsActionButtons />}
                    />
                    // add ID?
                ))}
            </div>

        </main>
    )
}