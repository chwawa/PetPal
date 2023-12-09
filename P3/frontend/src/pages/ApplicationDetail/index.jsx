
import { useNavigate, useParams } from 'react-router-dom';
import { React, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import Chat from "../../components/Chat";

import "./ApplicationDetail.css"


export default function ApplicationDetail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [application, setApplication] = useState("");
    const [chat, setChat] = useState([]);
    const url = 'http://127.0.0.1:8000' // change after deployment

    useEffect(() => {
        fetch(`${url}/applications/${id}`)
        .then(res => res.json())
        .then(json => {
            setApplication(json);
        })
    }, []);

    useEffect(() => {
        fetch(`${url}/comments/application/${id}`)
        .then(res => res.json())
        .then(json => {
            setChat(json.results);
        })
    }, []);

    return (
        <main>
            <p className='back-nav' onClick={() => navigate(-1)}>{'< Back'}</p>
            <div>
                <Card className="application-detail-layout">
                    <Card.Body>
                        <Card.Title><h1>Chat</h1></Card.Title>
                        { chat == [] 
                            ? (<div className="articles-container">
                                    {chat.map(c => (
                                        <Chat 
                                            commenter={c.commenter}
                                            text={c.text}
                                        />
                                    ))}
                                </div>)
                            : <h3></h3>
                        }
                    </Card.Body>
                </Card>

                <Card className="application-detail-layout">
                    <Card.Body className='basic-info-container'>
                        <Card.Title><h1>Adoption Application</h1></Card.Title>
                        <Card.Text></Card.Text>
                        <div >
                            <b>First Name</b>
                            <Card.Text>
                                {application.first_name}
                            </Card.Text>

                            <b>Email Address</b>
                            <Card.Text>
                                {application.email}
                            </Card.Text>

                            <b>Phone Number</b>
                            <Card.Text>
                                {application.phone}
                            </Card.Text>

                            <b>Do you have a secure outdoor area? (Minimum 6ft fence required for medium to larger breeds)</b>
                            <Card.Text>
                                {application.applicantOtherPetsNeutered}
                            </Card.Text>

                            <b>Does anyone in the house have previous convictions for animal cruelty or been banned from keeping animals for any period of time?</b>
                            <Card.Text>
                                {application.applicantHistory}
                            </Card.Text>

                            <b>How would you describe your home? Eg peaceful, calm or a very busy household.</b>
                            <Card.Text>
                                {application.applicantHome}
                            </Card.Text>

                            <b>Has anyone in the household ever had an allergy to pets?</b>
                            <Card.Text>
                                {application.applicantAllergy}
                            </Card.Text>
                        </div>
                        <div >
                            <b>Last Name</b>
                            <Card.Text>
                                {application.last_name}
                            </Card.Text>

                            <b>Address in Full</b>
                            <Card.Text>
                                {application.address}
                            </Card.Text>

                            <b>Details of other pets in household (breed, age, gender and personality)</b>
                            <Card.Text>
                                {application.applicantOtherPetDetails}
                            </Card.Text>

                            <b>Will the animal be left alone for long periods of time?</b>
                            <Card.Text>
                                {application.applicantAnimalAlone}
                            </Card.Text>

                            <b>Do you own your property? If you are renting do you have permission from your landlord? (Please specify which)</b>
                            <Card.Text>
                                {application.applicantProperty}
                            </Card.Text>

                            <b>What is your working schedule like?</b>
                            <Card.Text>
                                {application.applicantWork}
                            </Card.Text>

                            <b>Any other details to support your application?</b>
                            <Card.Text>
                                {application.applicantDetails}
                            </Card.Text>
                        </div>                        
                    </Card.Body>
                </Card>
            </div>
        </main>
    )
}