import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import ArticleCard from "../../components/ArticleCard";
import "./ShelterBlog.css";

export default function ShelterBlog() {
    let navigate = useNavigate();
    const currUserId = localStorage.getItem('id');
    const { id } = useParams();
    const accessToken = localStorage.getItem('access_token');
    const url = "http://127.0.0.1:8000"

    const [articles, setArticles] = useState([]);
    const [shelterName, setShelterName] = useState("Shelter");

    useEffect(() => {
        fetch(`${url}/shelterblog/${id}/blog/`, {
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

        fetch(`${url}/accounts/list/shelters`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(json => {
            const shelter = json.results.filter(s => s.id == id);
            if (shelter) {
                setShelterName(shelter[0].name)
            }
        })
    }, []);

    return (
        <main>
            <p className='back-nav' onClick={() => navigate(-1)}>{'< Back'}</p>
            
            <h1>{shelterName}'s Blog</h1>

            { id == currUserId
            ?   <div className="button-container">
                    <Button 
                        variant="light" 
                        className="new-post-button"
                        size="lg"
                        onClick={() => navigate("newpost")}
                    >
                        Create Post
                    </Button>
                </div>
            : null}

            { articles != [] 
                ? (<div className="articles-container">
                        {articles.map(article => (
                            <ArticleCard 
                                cardTitle={article.title}
                                cardBody={<pre>{article.content}</pre>}
                                numLikes={parseInt(localStorage.getItem(`like${article.id}`))}
                                // numLikes={article.likes}
                                articleID={article.id}
                            />
                        ))}
                    </div>)
                : <h3>It's empty here!</h3>
            }
            
           
        </main>
    )
}
