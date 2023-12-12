import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button"
import PetCard from "../../components/PetCard";

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [pets, setPets] = useState([]);
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const accessToken = localStorage.getItem('access_token');
    const seekerID = 2; // change to current seeker
    
    // handle get all seeker's applications
    
    useEffect(() => {
        fetch(`${url}/applications/applications/?applicant=${seekerID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setApplications(json.results);
        })

        fetch(`${url}/pets/`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${accessToken}`,
            // },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setPets(json.results);
        })
        .catch((e) => console.log(`Error: ${e}`))
    }, []);

    return (
        <main>
            <h1>My Applications:</h1>
            <hr class="solid"></hr>

            <div className="listings">
                { applications?.map(application => (
                    <PetCard 
                        cardImage={pets[application.pet - 1].picture} 
                        cardTitle={pets[application.pet - 1].name + ' • ' + pets[application.pet - 1].breed + ' • ' + pets[application.pet - 1].age + ' y/o'} 
                        cardText={pets[application.pet - 1].biography} 
                        link={`/applications/${application.id}`}
                    />
                    // add ID?
                ))}
            </div>

        </main>
    )
}