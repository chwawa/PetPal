import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button"
import PetCard from "../../components/PetCard";

export default function MyApplications() {
    const [pets, setPets] = useState([]);
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const seekerID = 1; // change to current shelter

    // handle get all seeker's applications

    useEffect(() => {
        fetch(`${url}/pets/?seeker=${seekerID}`)
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setPets(json.results);
        })
    }, []);

    return (
        <main>
            <h1>My Applications:</h1>
            <hr class="solid"></hr>

            <div className="listings">
                { pets.map(pet => (
                    <PetCard 
                        cardImage={pet.picture} 
                        cardTitle={pet.name + ' • ' + pet.breed + ' • ' + pet.age + ' y/o'} 
                        cardText={pet.biography} 
                    />
                    // add ID?
                ))}
            </div>

        </main>
    )
}