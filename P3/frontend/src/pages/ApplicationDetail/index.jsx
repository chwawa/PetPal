
import { useNavigate, useParams } from 'react-router-dom';
import { React, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import ApplicationComment from "../../components/ApplicationComment";
import ApplicationCommentCreation from "../../components/ApplicationCommentCreation";

import "./ApplicationDetail.css"


export default function ApplicationDetail() {
    let navigate = useNavigate();
    const { aid } = useParams();
    const [application, setApplication] = useState("");
    const [comments, setComments] = useState([]);
    const accessToken = localStorage.getItem('access_token');
    const url = 'http://127.0.0.1:8000' // change after deployment

    useEffect(() => {

        const accessToken = localStorage.getItem('access_token');
        const id = localStorage.getItem('id');

        fetch(`${url}/accounts/user/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          if (!res.ok) {
            navigate('*');
          }
          return res.json();
        })

        fetch(`${url}/applications/${aid}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            setApplication(json);
            console.log(json);
        })
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
          const accessToken = localStorage.getItem('access_token');
          const response = await fetch(`${url}/comments/application/${aid}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const allComments = await response.json();
            setComments(allComments);
            console.log(allComments);
          } else {
            throw new Error('Failed to fetch application comments');
          }
        } catch (error) {
          setComments([]);
        }
      };

    return (
        <main>
            <p className='back-nav' onClick={() => navigate(-1)}>{'< Back'}</p>
            <div>
                <Card className="application-detail-layout">
                    <Card.Body>
                        <Card.Title><h1>Chat</h1></Card.Title>
                        <div className="form-group">
                            <div className="scroll">
                                {comments?.map((comment) => (
                                <ApplicationComment text={comment.text} commenter={comment.commenter} creation_time={comment.creation_time} />
                                ))}
                            </div>
                            <p></p>
                        </div>
                        <div className="form-group">
                            <ApplicationCommentCreation application={aid} />
                        </div>
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
                                {application.applicantOtherPetsDetails}
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

                            <b>Status</b>
                            <Card.Text>
                                {application.status}
                            </Card.Text>
                        </div>                        
                    </Card.Body>
                </Card>
            </div>
        </main>
    )
}