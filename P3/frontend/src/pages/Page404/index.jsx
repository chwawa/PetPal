import ErrorCat from "../../assets/404cat.png";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import "./Page404.css";

export default function Page404() {
    let navigate = useNavigate();

    return (
        <div className="container">
            <img className="lost-cat" src={ErrorCat} alt="404"/>
            <h1>You look lost.</h1>
            <Button className="home-button" variant="light" onClick={() => navigate("/")}>Take Me Home</Button>
        </div>
        
    )
}
