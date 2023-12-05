import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

import AreYouSureModal from '../../components/AreYouSureModal';

import "./CreatePet.css";

export default function CreatePet() {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const shelterID = 1;

    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [species, setSpecies] = useState("dog");
    const [breed, setBreed] = useState("");
    const [size, setSize] = useState("small");
    const [colour, setColour] = useState("white");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [biography, setBiography] = useState("");
    
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
                    name: name,
                    picture: picture,
                    species: species,
                    breed: breed,
                    size: size,
                    colour: colour,
                    age: age,
                    location: location,
                    biography: biography
                    // shelter????
                }
            })
            .then(() => console.log("Successfully created a new pet!"))
            
            navigate("/mypets");
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
            <h2>Create a New Pet</h2>
            <hr class="solid"></hr>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='basic-info-container'>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Pet Name</Form.Label>
                        <Form.Control id="name" placeholder="Enter a name..." type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter the pet's name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Pet Picture</Form.Label>
                        <Form.Control id="picture" type="file"/>
                        <Form.Text>Choose the perfect picture that will steal everyone's hearts!</Form.Text>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Species</Form.Label>
                        <Form.Select id="species" aria-label="Select species">
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Breed</Form.Label>
                        <Form.Control id="breed" placeholder="Enter a breed..." type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a breed.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Size</Form.Label>
                        <Form.Select id="size" aria-label="Select size">
                            <option value="small">{'Small (< 9kg)'}</option>
                            <option value="medium">Medium (10-15kg)</option>
                            <option value="large">Large (16+ kg)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Colour</Form.Label>
                        <Form.Select id="colour" aria-label="Select colour">
                            <option value="white">White</option>
                            <option value="brown">Brown</option>
                            <option value="beige">Beige</option>
                            <option value="grey">Grey</option>
                            <option value="black">Black</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Age (in years)</Form.Label>
                        <Form.Control id="age" placeholder="Enter a number..." type="number" min="1" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid age, rounded up if necessary.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control id="location" placeholder="Enter a location..." type="text"/>
                    </Form.Group>
                </div>

                <Form.Group className='form-group'>
                    <Form.Label>Biography</Form.Label>
                    <Form.Control id="biography" placeholder="What is this pet's story?" as="textarea" rows={3}/>
                </Form.Group>
                
                <Button type="submit" className='pink-button' variant='light'>Create</Button>
            </Form>

        </main>
    )
}