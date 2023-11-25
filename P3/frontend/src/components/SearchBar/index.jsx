import React from "react";
import { useState, useEffect } from "react";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import "./SearchBar.css"

export default function Landing() {
    const [searchFilter, setSearchFilter] = useState("All")
    return (
        <>
            <InputGroup size="lg" className="searchbar">
                <Form.Control/>
                <DropdownButton
                    variant="outline-secondary"
                    title={searchFilter}
                    id="search-filters"
                    align="end"
                    >
                    <Dropdown.Item onClick={() => setSearchFilter("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchFilter("Dog")}>Dog</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchFilter("Cat")}>Cat</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSearchFilter("Other")}>Other</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </>
    )
}