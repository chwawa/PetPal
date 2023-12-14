import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from "react-bootstrap/Card";
import Heart from "react-animated-heart";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import "./ArticleCard.css"


export default function ArticleCard({cardTitle, cardBody, numLikes, articleID}) {
    const currUserId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('access_token');
    const { id } = useParams()
    const url = "http://127.0.0.1:8000"

    const [likes, setLikes] = useState(numLikes); // set to num of likes from fetch
    const [isClicked, setIsClicked] = useState(false); 
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(true);
    // localStorage.setItem(`like${articleID}`, likes)

    const handleLike = () => {
        setIsClicked(true);
        setLikes(likes + 1);
        localStorage.setItem(`like${articleID}`, likes + 1)

        // fetch(`${url}/shelterblog/${id}/blog/${articleID}/update/`, {
        //     method: "PUT",
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: {
        //         likes: likes,
        //     }
        // })
        
        setTimeout(() => {
            setIsClicked(false)
        }, 800);
    };

    const fetchComments = () => {
        fetch(`${url}/comments/blog/${articleID}?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            const newComments = data.results;
            console.log("data:", data.results)
            console.log(page)
            setComments([...comments, ...newComments]);
            if (!data.next) {
                setNext(false);
            } 
        })
        setPage(page + 1);
    }

    useEffect(() => {
        // fetch(`${url}/comments/blog/${articleID}/`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json',
        //     },
        // })
        // .then(response => response.json())
        // .then(json => {
        //     setComments(json)
        //     console.log(json)
        // })
        fetchComments();
    }, []);

    const [text, setText] = useState("")
    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData();
        formData.append('text', text)
        formData.append('commenter', currUserId)
        formData.append('blog', articleID) //change
        
        await fetch(`${url}/comments/blog/${articleID}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        })
        .then(() => console.log("Comment success"))
    }

    const allComments = () => {
        return (
            <Card.Footer>
                <div className="comments-container">
                    <InfiniteScroll
                        dataLength={comments.length}
                        next={fetchComments}
                        hasMore={next}
                        loader={<p>Loading comments...</p>}
                        endMessage={<p>No more comments!</p>}
                    >
                        {comments.map(comment => (
                            <p>User{comment.commenter}: {comment.text}</p>
                        ))}
                    </InfiniteScroll>
                </div>
                
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
