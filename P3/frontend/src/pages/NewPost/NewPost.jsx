import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import AreYouSureModal from '../../components/AreYouSureModal';


export default function CreatePet() {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const shelterID = 1;

    const  [post, setPost] = useState("");
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        setPost(pairs => ({...pairs, [key]:value}))
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            fetch(`${url}/pets/create/`, {
                method: "post",
                body: post, //shelter id???
            })
            .then(() => console.log("Successfully created a new [pst]!"))
            
            navigate(-1);
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
            <h2>Create a New Post</h2>
            <hr class="solid"></hr>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='form-group'>
                    <Form.Label className='required'>Post Title</Form.Label>
                    <Form.Control id="title" value={post.title} onChange={(event) => handleChange(event)} placeholder="Enter a title..." type="text" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter a title.
                    </Form.Control.Feedback>
                </Form.Group>
                   
                <Form.Group className='form-group'>
                    <Form.Label>Post Content</Form.Label>
                    <Form.Control id="content" value={post.content} onChange={(event) => handleChange(event)} placeholder="What would you like to share?" as="textarea" rows={5}/>
                </Form.Group>
                
                <Button type="submit" className='pink-button' variant='light'>Create</Button>
            </Form>
        </main>
    )
} 
