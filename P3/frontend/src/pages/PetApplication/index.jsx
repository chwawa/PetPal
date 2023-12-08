import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

import AreYouSureModal from '../../components/AreYouSureModal';

import "./PetApplication.css";

export default function CreateApplication() {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const shelterID = 1;

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [applicantOtherPetsDetails, setApplicantOtherPetsDetails] = useState("");
    const [applicantOtherPetsNeutered, setApplicantOtherPetsNeutered] = useState("");
    const [applicantOutdoorArea, setApplicantOutdoorArea] = useState("");
    const [applicantAnimalAlone, setApplicantAnimalAlone] = useState("");
    const [applicantHistory, setApplicantHistory] = useState("");
    const [applicantProperty, setApplicantProperty] = useState("");
    const [applicantHome, setApplicantHome] = useState("");
    const [applicantWork, setApplicantWork] = useState("");
    const [applicantAllergy, setApplicantAllergy] = useState("");
    const [applicantDetails, setApplicantDetails] = useState("");

    
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            fetch(`${url}/pets/create/`, {
                method: "post",
                body: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    address: address,
                    phone: phone,
                    applicantOtherPetsDetails: applicantOtherPetsDetails,
                    applicantOtherPetsNeutered: applicantOtherPetsNeutered,
                    applicantOutdoorArea: applicantOutdoorArea,
                    applicantAnimalAlone: applicantAnimalAlone,
                    applicantHistory: applicantHistory,
                    applicantProperty: applicantProperty,
                    applicantHome: applicantHome,
                    applicantWork: applicantWork,
                    applicantAllergy: applicantAllergy,
                    applicantDetails: applicantDetails
                    // shelter????
                }
            })
            .then(() => console.log("Successfully created an ?// application!"))
            
            navigate("/applications");
        }
        setValidated(true);
    }
    
    return (
        <main>
            <AreYouSureModal 
                title="Are you sure you want to go back?"
                body="Your process will be lost!"
                show={show}
                setShow={setShow}
            />

            <p className='back-nav' onClick={() => setShow(true)}>{'< Back'}</p>
            <h2>Create a New Application</h2>
            <hr class="solid"></hr>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='basic-info-container'>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>First Name</Form.Label>
                        <Form.Control id="first_name" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Last Name</Form.Label>
                        <Form.Control id="last_name" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Email Address</Form.Label>
                        <Form.Control id="email" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Address in Full</Form.Label>
                        <Form.Control id="address" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your address in full.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Phone Number</Form.Label>
                        <Form.Control id="phone" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Details of other pets in household (breed, age, gender and personality)</Form.Label>
                        <Form.Control id="applicantOtherPetsDetails" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter details of other pets in your household.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Do you have a secure outdoor area? (Minimum 6ft fence required for medium to larger breeds)</Form.Label>
                        <Form.Control id="applicantOutdoorArea" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if you have a secure outdoor area.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Will the animal be left alone for long periods of time?</Form.Label>
                        <Form.Control id="applicantAnimalAlone" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if the animal be left alone for long periods of time.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Does anyone in the house have previous convictions for animal cruelty or been banned from keeping animals for any period of time?</Form.Label>
                        <Form.Control id="applicantHistory" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if anyone in the house has had previous convictions for animal cruelty or been banned from keeping animals for any period of time.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Do you own your property? If you are renting do you have permission from your landlord? (Please specify which)</Form.Label>
                        <Form.Control id="applicantProperty" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if you own your property.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>How would you describe your home? Eg peaceful, calm or a very busy household.</Form.Label>
                        <Form.Control id="applicantHome" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter how you would describe your home.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>What is your working schedule like?</Form.Label>
                        <Form.Control id="applicantWork" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter what your working schedule is like.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Has anyone in the household ever had an allergy to pets?</Form.Label>
                        <Form.Control id="applicantAllergy" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter if anyone in the household ever had an allergy to pets.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Any other details to support your application?</Form.Label>
                        <Form.Control id="applicantDetails" type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter any other details to support your application.
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                
                <Button type="submit" className='pink-button' variant='light'>Submit</Button>
            </Form>

        </main>
    )
}