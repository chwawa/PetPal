import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import "./Filters.css"

export default function Filters(setSearchParams) {
    const [breed, setBreed] = useState("")
    const [gender, setGender] = useState("any")
    const [size, setSize] = useState("any")
    const [colour, setColour] = useState("any")
    const [age, setAge] = useState("any")
    const [location, setLocation] = useState("")
    const [message, setMessage] = useState("")

    const filters = {
        breed: {breed},
        gender: {gender},
        size: {size},
        colour: {colour},
        age: {age},
        location: {location},
    }

    const onTrigger = (event) => {
        event.preventDefault();
        setSearchParams({filters: filters, page: 1});
        
    }

    return (
        <Form onSubmit={(event) => onTrigger(event)}>
             <Form.Group className='form-group'>
                <Form.Label>Breed</Form.Label>
                <Form.Control type="text" value={breed} onChange={(e) => setBreed(e.target.value.toLowerCase())}/>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Select gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Size</Form.Label>
                <Form.Select aria-label="Select size" onChange={(e) => setSize(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="small">Small (5-10kg)</option>
                    <option value="medium">Medium (10-15kg)</option>
                    <option value="large">Large (15-30kg)</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Colour</Form.Label>
                <Form.Select aria-label="Select colour" onChange={(e) => setColour(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="white">White</option>
                    <option value="brown">Brown</option>
                    <option value="beige">Beige</option>
                    <option value="grey">Grey</option>
                    <option value="black">Black</option>
                    <option value="other">Other</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Age</Form.Label>
                <Form.Select aria-label="Select age" onChange={(e) => setAge(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="<1">{'< 1 year'}</option>
                    <option value="1-3">1-3 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="7-9">7-9 years</option>
                    <option value="10+">10+ years</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
             </Form.Group>

            
             <Button onClick={() => setMessage("Your filters have been reset!")}>Reset</Button>
             <Button type="submit" onClick={() => setMessage("Your filters have been applied!")}>Apply Filters</Button>

             <p>{message}</p>
        </Form>
    )
}
