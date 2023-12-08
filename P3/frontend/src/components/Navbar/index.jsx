import React from "react";

import logo from "../../assets/logo.svg"
import bell from "../../assets/notif_bell.svg"
import Dropdown from 'react-bootstrap/Dropdown';
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

function Navbar() {
    const id = localStorage.getItem("id");
    const Navigate = useNavigate();
    return (
      <>
        <header>
          <a href="/" className="logo">
            PetPal
            <img src={logo} className="logo_image"/>
          </a>
          <a href="/">
            Home
          </a>
          {/* Change to My Applications is seeker; My Pets if shelter */}
          <a href="/mypets">
            My Pets
          </a>
          
          <Dropdown className="float-right">
            <Dropdown.Toggle variant="light" className="myprofile-dropdown">
                My Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => Navigate(`/profile/${id}`)}>View Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => Navigate(`/profile/update/${id}`)}>Edit Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <a href="/" className="notif_button float-right">
            <img src={bell} />
          </a>

        </header>
      </>
    );
  }
  
  export default Navbar;