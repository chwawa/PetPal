import ArticleCard from "../../components/ArticleCard";
import "./ShelterBlog.css";

export default function ShelterBlog() {
    // fetch

    const shelter = "Shelter1";

    return (
        <main>
            <h1>{shelter}'s Blog</h1>
            <div className="articles-container">
                <ArticleCard 
                    cardTitle={"How to..."}
                    cardBody={"This is the content"}
                    fetchedLikes={10}
                    fetchedClicked={false}
                />
                <ArticleCard 
                    cardTitle={"How to..."}
                    cardBody={"This is the content"}
                    fetchedLikes={10}
                    fetchedClicked={false}
                />
                <ArticleCard 
                    cardTitle={"How to..."}
                    cardBody={"This is the content"}
                    fetchedLikes={10}
                    fetchedClicked={false}
                />
            </div>
           
        </main>
    )
}
