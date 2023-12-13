import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button"
import PetCard from "../../components/PetCard";
import { useParams } from "react-router-dom";

export default function ApplicationsPet() {

    const [applications, setApplications] = useState([]);
    const [seekers, setSeekers] = useState([]);
    const { id } = useParams();
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const accessToken = localStorage.getItem('access_token');
    const shelterID = localStorage.getItem('id');
    
    // handle get all shelter's applications
    
    useEffect(() => {
        fetch(`${url}/applications/applications/?shelter=${shelterID}&pet=${id}`, {
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

        fetch(`${url}/accounts/all/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setSeekers(json);
        })
        .catch((e) => console.log(`Error: ${e}`))
    }, []);

    return (
        <main>
            <h1>Applications:</h1>
            <hr class="solid"></hr>

            <div className="listings">
                { applications?.map(application => (
                    <PetCard 
                        aID={application.id}
                        cardImage={seekers[application.applicant - 1].profile_pic} 
                        cardTitle={seekers[application.applicant - 1].name + '  •  ' + seekers[application.pet - 1].location} 
                        cardText={seekers[application.applicant - 1].about} 
                        aButton={true}
                    />
                    // add ID?
                ))}
            </div>

        </main>
    )
}