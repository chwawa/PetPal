import { useEffect, useState } from "react";

import ArticleCard from "../../components/ArticleCard";
import "./ShelterBlog.css";

export default function ShelterBlog() {
    const currUserId = localStorage.getItem('id');
    const shelter = "CHANGE THIS"
    const accessToken = localStorage.getItem('access_token');
    const url = "http://127.0.0.1:8000"

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`${url}/shelterblog`, {
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
            <h1>{shelter}'s Blog</h1>
            <div className="articles-container">
                {articles.map(article => (
                    <ArticleCard 
                        cardTitle={article.title}
                        cardBody={<pre>{article.content}</pre>}
                        fetchedLikes={article.likes.length}
                        fetchedClicked={false}
                    />
                ))}
            </div>
           
        </main>
    )
}
