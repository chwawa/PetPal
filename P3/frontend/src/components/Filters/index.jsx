import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "./Filters.css"

export default function Filters() {
    return (
        <Form>
             <Form.Group className='form-group'>
                <Form.Label>Breed</Form.Label>
                <Form.Control type="text" />
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Select breed">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Size</Form.Label>
                <Form.Select aria-label="Select breed">
                    <option value="small">Small (5-10kg)</option>
                    <option value="medium">Medium (10-15kg)</option>
                    <option value="large">Large (15-30kg)</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Colour</Form.Label>
                <Form.Select aria-label="Select colour">
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
                <Form.Select aria-label="Select age">
                    <option value="<1">{'< 1 year'}</option>
                    <option value="1-3">1-3 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="7-9">7-9 years</option>
                    <option value="10+">10+ years</option>
                </Form.Select>
             </Form.Group>

             <Form.Group className='form-group'>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
             </Form.Group>

             <Button>Reset</Button>
             <Button type="submit">Apply Filters</Button>
        </Form>
    )
}
