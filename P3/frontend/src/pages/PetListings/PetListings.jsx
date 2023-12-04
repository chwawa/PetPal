// Resulting page from an intial search

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import PetCard from "../../components/PetCard";
import Filters from "../../components/Filters";

import "./PetListings.css"


function to_url_params(object) {
    // Code taken from lecture basketball example 
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            result.push(`${key}=${value}`);
        }
    }
    return result.join('&');
}


export default function PetListings() {
    const [sort, setSort] = useState("name");
    const [open, setOpen] = useState(false);
    const [pets, setPets] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const { species } = useParams();
    const url = 'http://127.0.0.1:8000' // change after deployment

    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        breed : searchParams.get("breed") ?? [],
        gender : searchParams.get("gender") ?? [],
        size : searchParams.get("size") ?? [],
        colour : searchParams.get("colour") ?? [],
        age__lte : searchParams.get("age__lte") ?? [],
        age__gte : searchParams.get("age__gte") ?? [],
        age__range : searchParams.get("age__range") ?? [],
        location : searchParams.get("location") ?? [],
    }), [searchParams]);

    useEffect(() => {
        const params = to_url_params(query);
        fetch(`${url}/pets/?species=${species}&sort=${sort}&${params}`)
        .then(res => res.json())
        .then(json => {
            setPets(json.results);
            setTotalPages(Math.ceil(parseInt(json.count) / 9));
        })
    }, [query, sort]);

    const [message, setMessage] = useState("")

    const handleReset = () => {
        setMessage("Your filters have been reset!");
        setSearchParams({page : 1})
    }

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
                        <Dropdown.Item onClick={() => setSort("name")}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSort("age")}>Age</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSort("size")}>Size</Dropdown.Item>
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
                    <Modal.Header closeButton style={{backgroundColor: "#f6bbc4", color: "white"}} onClick={() => setMessage("")}>
                        <Modal.Title>Filters</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(event) => event.preventDefault()}>
                            <Form.Group className='form-group'>
                                <Form.Label>Breed</Form.Label>
                                <Form.Control placeholder="Enter a breed..." type="text" value={searchParams.get("breed")} onChange={(e) => setSearchParams({...query, breed: e.target.value, page: 1})}/>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Select gender" value={searchParams.get("gender")} onChange={(e) => setSearchParams({...query, gender: e.target.value, page: 1})}>
                                    <option value="">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label>Size</Form.Label>
                                <Form.Select aria-label="Select size" value={searchParams.get("size")} onChange={(e) => setSearchParams({...query, size: e.target.value, page: 1})}>
                                    <option value="">All</option>
                                    <option value="small">{'Small (< 9kg)'}</option>
                                    <option value="medium">Medium (10-15kg)</option>
                                    <option value="large">Large (16+ kg)</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label>Colour</Form.Label>
                                <Form.Select aria-label="Select colour" value={searchParams.get("colour")} onChange={(e) => setSearchParams({...query, colour: e.target.value, page: 1})}>
                                    <option value="">All</option>
                                    <option value="white">White</option>
                                    <option value="brown">Brown</option>
                                    <option value="beige">Beige</option>
                                    <option value="grey">Grey</option>
                                    <option value="black">Black</option>
                                    <option value="other">Other</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label>Age</Form.Label>
                                <Form.Select aria-label="Select age" value={searchParams.get("age")} 
                                    onChange={(e) => {
                                        if (e.target.value == 3) {
                                            setSearchParams({...query, age__gte: [], age__lte: e.target.value, age__range: [], page: 1})
                                        } else if (e.target.value == 8) {
                                            setSearchParams({...query, age__gte: e.target.value, age__lte: [], age__range: [], page: 1})
                                        } else {
                                            setSearchParams({...query, age__gte: [], age__lte: [], age__range: e.target.value, page: 1})
                                        }
                                    }}
                                >
                                    <option value="">All</option>
                                    <option value="3">{'< 3 years'}</option>
                                    <option value="4,7">4-7 years</option>
                                    <option value="8">8+ years</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control placeholder="Enter a location..." type="text" value={searchParams.get("location")} onChange={(e) => setSearchParams({...query, location: e.target.value, page: 1})}/>
                            </Form.Group>

                            
                            <Button className="filter-button" variant="light" onClick={() => handleReset()}>Reset</Button>
                            <Button className="filter-button" variant="light" type="submit" onClick={() => setMessage("Your filters have been applied!")}>Apply Filters</Button>

                            <p>{message}</p>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
            

            <div className="listings">
                { pets.map(pet => (
                    <PetCard cardImage={pet.picture} cardTitle={pet.name} cardText={pet.biography} />
                    // add ID?
                ))}
            </div>

            <p>
                { query.page > 1 
                    ? <Button className="nav-button" variant="light" onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</Button>
                    : <></> }
                { query.page < totalPages
                    ? <Button className="nav-button" variant="light" onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</Button>
                    : <></> }
            </p>
            <p>Page {query.page} out of {totalPages}</p>
            
        </main>
    )
}