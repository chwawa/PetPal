import Form from 'react-bootstrap/Form';
import AreYouSureModal from '../AreYouSureModal';

import "./CreateUpdatePetForm.css";
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateUpdatePetForm({method}) {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const { id } = useParams();
    const shelterID = 1;

    const [pet, setPet] = useState("");
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch(`${url}/pets/${id}`)
        .then(res => res.json())
        .then(json => {
            setPet(json);
        })
    }, []);

    const handleChange = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        setPet(pairs => ({...pairs, [key]:value}))
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let fetchurl;
            if (method === "post") {
                fetchurl = `${url}/pets/create/`;
            } else {
                fetchurl = `${url}/pets/${id}/`;
            }
            console.log(method)
            fetch(fetchurl, {
                method: method,
                body: pet, // shelter id????
            })
            .then(() => console.log("Update pet detail successful"))
            navigate("/mypets");
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

            {method == "post"
                ? <h2>Create a New Pet</h2>
                : <h2>Update Pet</h2>}
            
            <hr className='solid'></hr>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='basic-info-container'>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Pet Name</Form.Label>
                        <Form.Control id="name" value={pet.name} onChange={(event) => handleChange(event)} placeholder="Enter a name..." type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter the pet's name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Pet Picture</Form.Label>
                        <Form.Control id="picture" value={""} onChange={(event) => handleChange(event)} type="file"/>
                        <Form.Text>Choose the perfect picture that will steal everyone's hearts!</Form.Text>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Species</Form.Label>
                        <Form.Select id="species" value={pet.species} onChange={(event) => handleChange(event)} aria-label="Select species">
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Breed</Form.Label>
                        <Form.Control id="breed" value={pet.breed} onChange={(event) => handleChange(event)} placeholder="Enter a breed..." type="text" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a breed.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Size</Form.Label>
                        <Form.Select id="size" value={pet.size} onChange={(event) => handleChange(event)} aria-label="Select size">
                            <option value="small">{'Small (< 9kg)'}</option>
                            <option value="medium">Medium (10-15kg)</option>
                            <option value="large">Large (16+ kg)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label className='required'>Colour</Form.Label>
                        <Form.Select id="colour" value={pet.colour} onChange={(event) => handleChange(event)} aria-label="Select colour">
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
                        <Form.Control id="age" value={pet.age} onChange={(event) => handleChange(event)} placeholder="Enter a number..." type="number" min="1" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid age, rounded up if necessary.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control id="location" value={pet.location} onChange={(event) => handleChange(event)} placeholder="Enter a location..." type="text"/>
                    </Form.Group>
                </div>

                <Form.Group className='form-group'>
                    <Form.Label>Biography</Form.Label>
                    <Form.Control id="biography" value={pet.biography} onChange={(event) => handleChange(event)} placeholder="What is this pet's story?" as="textarea" rows={3}/>
                </Form.Group>
                
                { method === "post" 
                    ? <Button type="submit" className='pink-button' variant='light'>Create</Button>
                    : <Button type="submit" className='pink-button' variant='light'>Update</Button>}
                
            </Form>
        </>
    )
}