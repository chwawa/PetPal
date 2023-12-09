import React from "react";
import logo from "../../assets/logo.svg";
import bell from "../../assets/notif_bell.svg";
import { Link, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const currURL = location.pathname;
    const user = "Shelter" // change to get user type from context or local storage or something
    const id = localStorage.getItem("id");
    const Navigate = useNavigate();

    const handleDeleteAccount = async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/accounts/user/${id}/deletion/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    navigate('/')
  };

    return (
      <>
        <header>
          <Link to="/" className="link logo">
            PetPal
            <img src={logo} className="logo_image"/>
          </Link>

          <Link to="/" className={(currURL === "/" || currURL.startsWith("/pets")) ? "active link" : "link"}>
            Home
          </Link>

          {/* Change to My Applications is seeker; My Pets if shelter */}
          {user == "Shelter"
            ? <Link to="/mypets" className={currURL.startsWith("/mypets") ? "active link" : "link"}>
                My Pets
              </Link>
            : <Link to="/myapplications" className={currURL.startsWith("/myapplications") ? "active link" : "link"}>
                My Applications
              </Link>
          }
          
          <Dropdown className="float-right">
            <Dropdown.Toggle variant="light" className="myprofile-dropdown">
              My Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/profile/${id}`} className="myprofile-link">
                  View Profile
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={`/profile/update/${id}`} className="myprofile-link" >
                  Edit Profile
                </Link>
              </Dropdown.Item>
                
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleDeleteAccount}>
              Delete Account
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {localStorage.setItem('access_token', ''); 
                                          navigate('/');}}>
              Log Out
            </Dropdown.Item>
          </Dropdown>

          <Link to="/notifications" className={currURL === "/notifications" ? "active link notif_button float-right" : "link notif_button float-right"}>
            <img src={bell} />
          </Link>

export default Navbar;
