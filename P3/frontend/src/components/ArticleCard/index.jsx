import { useState } from "react";

import Card from "react-bootstrap/Card";
import Heart from "react-animated-heart";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import "./ArticleCard.css"

export default function ArticleCard({cardTitle, cardBody, fetchedLikes, fetchedClicked}) {
    const [likes, setLikes] = useState(fetchedLikes); // set to num of likes from fetch
    const [isClicked, setIsClicked] = useState(fetchedClicked); //set to true or false from fetch
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
    };

    const comments = () => {
        return (
            <Card.Footer>
                {/* loop */}
                fetched comments here

                <div className="comment-textbox">
                    <Form.Control type="text" />
                    <Button type="submit" variant="light" className="pink-button"><FontAwesomeIcon icon={faPaperPlane} /></Button>
                </div>
               
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

            { showComments ? comments() : null }

        </Card>
    )
}
