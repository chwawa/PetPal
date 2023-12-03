// Resulting page from an intial search

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import PetCard from "../../components/PetCard";
import Filters from "../../components/Filters";

import "./PetListings.css"

export default function PetListings() {
    const [sort, setSort] = useState("Name");
    const [open, setOpen] = useState(false);
    const [pets, setPets] = useState([]);
    const { species } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/pets/?species=${species}`)
        .then(res => res.json())
        .then(json => {
            setPets(json.results)
        })
    })

    return (
        <main>
            <div className="search-page-buttons">
                <a href="/">{"< Back"}</a>
                
                <Dropdown className="float-right">
                    <Dropdown.Toggle
                        className="sort-button"
                        variant="light"
                        size="lg"
                        id="search-filters"    
                    >
                        Sort by: {sort}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSort("Name")}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSort("Age")}>Age</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSort("Size")}>Size</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Button 
                    className="filter-button float-right" 
                    variant="light" 
                    size="lg"
                    onClick={() => setOpen(true)}
                >
                    Filters
                </Button>
                <Modal
                    show={open}
                    fullscreen={'xxl-down'}
                    onHide={() => setOpen(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Filters</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Filters />
                    </Modal.Body>
                </Modal>
            </div>
            

            <div className="listings">
                { pets.map(pet => (
                    <PetCard cardImage={pet.picture} cardTitle={pet.name} cardText={pet.biography} />
                ))}
            </div>

            

        </main>
    )
}