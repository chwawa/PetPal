import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog, faPaw } from '@fortawesome/free-solid-svg-icons';

import "./Landing.css";

export default function Landing() {
    let navigate = useNavigate();

    function handleClick(species) {
        navigate(`/pets/${species}`);
    }

    return (
        <main>
            <div className="landing">
                <h1>Find your new best friend!</h1>
                <p>I'm looking for...</p>
                
                <div className="d-grid gap-4">
                    <Button variant="light" size="lg" className="animal-button" onClick={() => handleClick("dog")}>
                        {"Dogs "}
                        <FontAwesomeIcon icon={faDog} />
                    </Button>

                    <Button variant="light" size="lg" className="animal-button" onClick={() => handleClick("cat")}>
                        {"Cats "}
                        <FontAwesomeIcon icon={faCat} />
                    </Button>

                    <Button variant="light" size="lg" className="animal-button" onClick={() => handleClick("other")}>
                        {"Others "}
                        <FontAwesomeIcon icon={faPaw} />
                    </Button>
                </div>
            </div>
            
        </main>
    )
}