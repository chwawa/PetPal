import { useState, useEffect, useMemo } from "react";
import PetCard from "../../components/PetCard";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


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

export default function ApplicationsPet() {
    const [sort, setSort] = useState("");
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);

    const [applications, setApplications] = useState([]);
    const [seekers, setSeekers] = useState([]);
    const { id } = useParams();
    const url = 'http://127.0.0.1:8000'; // change after deployment
    const accessToken = localStorage.getItem('access_token');
    const shelterID = localStorage.getItem('id');

    const query = useMemo(() => ({
        page : parseInt(searchParams.get("page") ?? 1),
        status : searchParams.get("status") ?? [],
        first_name : searchParams.get("first_name") ?? [],
        last_name : searchParams.get("last_name") ?? [],
    }), [searchParams]);
    
    // handle get all shelter's applications
    
    useEffect(() => {
        const params = to_url_params(query);
        fetch(`${url}/applications/applications/?shelter=${shelterID}&pet=${id}&sort=${sort}&${params}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json.results)
            setApplications(json.results);
            setTotalPages(Math.floor((parseInt(json.count) / 9) + 1));
        })

        fetch(`${url}/accounts/all/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setSeekers(json);
        })
        .catch((e) => console.log(`Error: ${e}`))
    }, [query, sort]);

    const [message, setMessage] = useState("")

    const handleReset = () => {
        setMessage("Your filters have been reset!");
        setSearchParams({page : 1})
    }

    return (
        <main>
            <h1>Applications:</h1>
            <hr class="solid"></hr>
            <div className="search-page-buttons">
                <a href="/mypets">{"< Back"}</a>
                
                <Dropdown className="float-right">
                    <Dropdown.Toggle
                        className="sort-button"
                        variant="light"
                        size="lg"
                        id="search-filters"    
                    >
                        Sort by:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSort("creation_time")}>Creation Time</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSort("last_updated")}>Last Updated</Dropdown.Item>
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
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Select status" value={searchParams.get("status")} onChange={(e) => setSearchParams({...query, status: e.target.value, page: 1})}>
                                    <option value="">All</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="DENIED">Denied</option>
                                    <option value="WITHDRAWN">Withdrawn</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>Applicant First Name</Form.Label>
                                <Form.Control placeholder="Enter an applicant's first name..." type="text" value={searchParams.get("first_name")} onChange={(e) => setSearchParams({...query, first_name: e.target.value, page: 1})}/>
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>Applicant Last Name</Form.Label>
                                <Form.Control placeholder="Enter an applicant's last name..." type="text" value={searchParams.get("last_name")} onChange={(e) => setSearchParams({...query, last_name: e.target.value, page: 1})}/>
                            </Form.Group>
                            
                            <Button className="filter-button" variant="light" onClick={() => handleReset()}>Reset</Button>
                            <Button className="filter-button" variant="light" type="submit" onClick={() => setMessage("Your filters have been applied!")}>Apply Filters</Button>

                            <p>{message}</p>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>

            <div className="listings">
                { applications?.map(application => (
                    
                    <PetCard 
                        aID={application.id}
                        cardImage={seekers[application.applicant - 1].profile_pic} 
                        cardTitle={seekers[application.applicant - 1].name + '  •  ' + seekers[application.applicant - 1].location} 
                        cardText={seekers[application.applicant - 1].about} 
                        aButton={true}
                    />
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