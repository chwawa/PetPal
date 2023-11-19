import React from "react";
import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../../assets/logo.svg"
import bell from "../../assets/notif_bell.svg"

// import Dropdown from 'react-bootstrap/Dropdown';

import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
    return (
      <>
        <header>
          <a href="/" className="logo">
            PetPal
            <img src={logo} />
          </a>
          <a href="/">
            Home
          </a>
          <a href="">
            My Pets
          </a>
          
          <Dropdown className="float-right">
            <Dropdown.Toggle variant="light">
                My Profile
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
                <Dropdown.Item>View Profile</Dropdown.Item>
                <Dropdown.Item>Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <a href="/" className="float-right">
            <img src={bell} />
          </a>

        </header>

        
      </>
    );
  }
  
  export default Navbar;