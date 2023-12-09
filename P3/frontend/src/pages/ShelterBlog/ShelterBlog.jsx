import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ArticleCard from "../../components/ArticleCard";
import "./ShelterBlog.css";

export default function ShelterBlog() {
    let navigate = useNavigate();
    const currUserId = localStorage.getItem('id');
    const shelterName = "CHANGE THIS"
    const shelterID = 2
    const accessToken = localStorage.getItem('access_token');
    const url = "http://127.0.0.1:8000"

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`${url}/shelterblog/${shelterID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                setArticles(json.results)
            })
    }, []);

    return (
        <main>
            <h1>{shelterName}'s Blog</h1>

            <div className="button-container">
                <Button 
                    variant="light" 
                    className="new-post-button"
                    size="lg"
                    onClick={() => navigate("newpost")}
                >
                    Create Post
                </Button>
            </div>
            
            
                { articles == [] 
                    ? (<div className="articles-container">
                            {articles.map(article => (
                                <ArticleCard 
                                    cardTitle={article.title}
                                    cardBody={<pre>{article.content}</pre>}
                                    fetchedLikes={article.likes.length}
                                    fetchedClicked={false}
                                />
                            ))}
                        </div>)
                    : <h3>It's empty here!</h3>
                }
            
           
        </main>
    )
}
