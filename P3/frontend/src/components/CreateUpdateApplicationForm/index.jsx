import Form from 'react-bootstrap/Form';
import AreYouSureModal from '../AreYouSureModal';

import "./CreateUpdateApplicationForm.css";
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateUpdateApplicationForm({method}) {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const { pid } = useParams();
    const { aid } = useParams();
    const seekerID = localStorage.getItem('id');
    const userType = localStorage.getItem('usertype');
    const [isSeeker, setIsSeeker] = useState(false);
    const [isShelter, setIsShelter] = useState(false);
    const [pet, setPet] = useState("");
    const accessToken = localStorage.getItem('access_token');
    const [application, setApplication] = useState(
        {
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            phone: "",
            applicantOtherPetsDetails: "",
            applicantOtherPetsNeutered: "",
            applicantOutdoorArea: "",
            applicantAnimalAlone: "",
            applicantHistory: "",
            applicantProperty: "",
            applicantHome: "",
            applicantWork: "",
            applicantAllergy: "",
            applicantDetails: "",
            status: "PENDING",
        }
    );
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`${url}/applications/${aid}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            setApplication(json);
            if (userType == 'seeker') {
                setIsSeeker(true);
            }
            if (userType == 'shelter') {
                setIsShelter(true);
            }
        })


        fetch(`${url}/pets/${pid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            setPet(json);
        })
        .catch((e) => console.log(`Error: ${e}`))
        
    }, []);

    const handleChange = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        setApplication({...application, [key]:value})
    }

    async function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            let fetchurl;
            if (method === "POST") {
                fetchurl = `${url}/applications/pet/${pid}/`;
            } else {
                fetchurl = `${url}/applications/${aid}/update/`;
            }

            var formData = new FormData();
            formData.append('shelter', pet.shelter)
            formData.append('first_name', application.first_name)
            formData.append('last_name', application.last_name)
            formData.append('email', application.email)
            formData.append('address', application.address)
            formData.append('phone', application.phone)
            formData.append('applicantOtherPetsDetails', application.applicantOtherPetsDetails)
            formData.append('applicantOtherPetsNeutered', application.applicantOtherPetsNeutered)
            formData.append('applicantOutdoorArea', application.applicantOutdoorArea)
            formData.append('applicantAnimalAlone', application.applicantAnimalAlone)
            formData.append('applicantHistory', application.applicantHistory)
            formData.append('applicantProperty', application.applicantProperty)
            formData.append('applicantHome', application.applicantHome)
            formData.append('applicantWork', application.applicantWork)
            formData.append('applicantAllergy', application.applicantAllergy)
            formData.append('applicantDetails', application.applicantDetails)
            formData.append('applicant', seekerID)
            formData.append('status', application.status)
            formData.append('pet', pid)

            await fetch(fetchurl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            })
            .then(() => console.log(application))
            if (isSeeker) {
                navigate("/applications");        
            }
            if (isShelter) {
                navigate("/mypets");      
            }
            
        }
        setValidated(true);
    }
    
    return (
        <>
            <AreYouSureModal 
                title="Are you sure you want to go back?"
                body="Your process will be lost!"
                show={show}
                setShow={setShow}
            />

            <p className='back-nav' onClick={() => setShow(true)}>{'< Back'}</p>

            {method == "POST"
                ? <h2>Create a New Application</h2>
                : <h2>Update Application</h2>}
            
            <hr className='solid'></hr>

            <Form id="create-app-form" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='basic-info-container'>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>First Name</Form.Label>
                        <Form.Control id="first_name" value={application.first_name} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Last Name</Form.Label>
                        <Form.Control id="last_name" value={application.last_name} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Email Address</Form.Label>
                        <Form.Control id="email" value={application.email} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Address in Full</Form.Label>
                        <Form.Control id="address" value={application.address} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your address in full.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Phone Number</Form.Label>
                        <Form.Control id="phone" value={application.phone} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Details of other pets in household (breed, age, gender and personality)</Form.Label>
                        <Form.Control id="applicantOtherPetsDetails" value={application.applicantOtherPetsDetails} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter details of other pets in your household.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Are other pets neutered/spayed?</Form.Label>
                        <Form.Control id="applicantOtherPetsNeutered" value={application.applicantOtherPetsNeutered} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if other pets are neutered/spayed.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Do you have a secure outdoor area? (Minimum 6ft fence required for medium to larger breeds)</Form.Label>
                        <Form.Control id="applicantOutdoorArea" value={application.applicantOutdoorArea} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if you have a secure outdoor area.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Will the animal be left alone for long periods of time?</Form.Label>
                        <Form.Control id="applicantAnimalAlone" value={application.applicantAnimalAlone} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if the animal be left alone for long periods of time.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Does anyone in the house have previous convictions for animal cruelty or been banned from keeping animals for any period of time?</Form.Label>
                        <Form.Control id="applicantHistory" value={application.applicantHistory} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if anyone in the house has had previous convictions for animal cruelty or been banned from keeping animals for any period of time.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Do you own your property? If you are renting do you have permission from your landlord? (Please specify which)</Form.Label>
                        <Form.Control id="applicantProperty" value={application.applicantProperty} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if you own your property.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>How would you describe your home? Eg peaceful, calm or a very busy household.</Form.Label>
                        <Form.Control id="applicantHome" value={application.applicantHome} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter how you would describe your home.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>What is your working schedule like?</Form.Label>
                        <Form.Control id="applicantWork" value={application.applicantWork} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter what your working schedule is like.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Has anyone in the household ever had an allergy to pets?</Form.Label>
                        <Form.Control id="applicantAllergy" value={application.applicantAllergy} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if anyone in the household ever had an allergy to pets.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Any other details to support your application?</Form.Label>
                        <Form.Control id="applicantDetails" value={application.applicantDetails} onChange={(event) => handleChange(event)} type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter any other details to support your application.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Status</Form.Label>
                        {isSeeker && (
                            <Form.Select id="status" value={application.status} onChange={(event) => handleChange(event)} aria-label="Select status">
                                <option value="PENDING">PENDING</option>
                                <option value="WITHDRAWN">WITHDRAWN</option>
                            </Form.Select>
                        )}
                        {isShelter && (
                            <Form.Select id="status" value={application.status} onChange={(event) => handleChange(event)} aria-label="Select status">
                                <option value="PENDING">PENDING</option>
                                <option value="ACCEPTED">ACCEPTED</option>
                                <option value="DENIED">DENIED</option>
                                
                            </Form.Select>
                        )}
                    </Form.Group>
                </div>
                
                { method === "POST" 
                    ? <Button type="submit" className='pink-button' variant='light'>Create</Button>
                    : <Button type="submit" className='pink-button' variant='light'>Update</Button>}
                
            </Form>
        </>
    )
}