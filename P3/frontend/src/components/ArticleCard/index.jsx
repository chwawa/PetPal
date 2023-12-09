import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Heart from "react-animated-heart";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import "./ArticleCard.css"


export default function ArticleCard({cardTitle, cardBody, fetchedLikes, fetchedClicked, articleID}) {
    const currUserId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('access_token');
    const { id } = useParams()
    const url = "http://127.0.0.1:8000"

    const [likes, setLikes] = useState(fetchedLikes); // set to num of likes from fetch
    const [isClicked, setIsClicked] = useState(fetchedClicked); //set to true or false from fetch
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([])

    const handleLike = () => {
        if (isClicked) {
            setLikes(likes - 1);

        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        fetch(`${url}/comments/shelter/${id}/blog`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            
            setComments(json.results)
            console.log(json.results)
            
        })
    }, []);

    const [text, setText] = useState("")
    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData();
        formData.append('text', text)
        formData.append('commenter', currUserId)
        formData.append('blog', id) //change
        
        await fetch(`${url}/comments/shelter/${id}/blog`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: formData,
        })
        .then(() => console.log("Comment success"))

        
    }

    const allComments = () => {
        return (
            <Card.Footer>
                {comments.map(comment => (
                    comment
                ))}

              
                <Form onSubmit={handleSubmit} className="comment-textbox">
                    <Form.Control type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                    <Button type="submit" variant="light" className="pink-button"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                </Form>
                
               
            </Card.Footer>
        )
    }

    return (
        <Card style={{ marginTop: 15 }}>
            <Card.Body>
                <Card.Title>{cardTitle}</Card.Title>
                <Card.Text>{cardBody}</Card.Text>
            </Card.Body>
            <div className="actions-container">
                <p>
                    {likes} likes
                    <span onClick={() => setShowComments(!showComments)}>Comments</span>
                </p>
                <Heart isClick={isClicked} onClick={() => handleLike()} />
            </div>

            { showComments ? allComments() : null }

        </Card>
    )
}
