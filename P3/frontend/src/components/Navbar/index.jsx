import React from "react";

import logo from "../../assets/logo.svg"
import bell from "../../assets/notif_bell.svg"
import Dropdown from 'react-bootstrap/Dropdown';

import { Outlet } from "react-router-dom";

import "./Navbar.css"

function Navbar() {
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
          <a href="">
            My Pets
          </a>
          
          <Dropdown className="float-right">
            <Dropdown.Toggle variant="light" className="myprofile-dropdown">
                My Profile
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
                <Dropdown.Item>View Profile</Dropdown.Item>
                <Dropdown.Item>Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <a href="/" className="notif_button float-right">
            <img src={bell} />
          </a>

        </header>
        <Outlet />
        
      </>
    );
  }
  
  export default Navbar;