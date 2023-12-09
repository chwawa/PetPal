import React from "react";
import logo from "../../assets/logo.svg";
import bell from "../../assets/notif_bell.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

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
        <a href="/" className="logo">
          PetPal
          <img src={logo} className="logo_image" alt="PetPal Logo" />
        </a>
        <a href="/">Home</a>
        <a href="/mypets">My Pets</a>

        <Dropdown className="float-right">
          <Dropdown.Toggle variant="light" className="myprofile-dropdown">
            My Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate(`/profile/${id}`)}>
              View Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(`/profile/update/${id}`)}>
              Edit Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleDeleteAccount}>
              Delete Account
            </Dropdown.Item>
            <Dropdown.Item onClick={() => {localStorage.setItem('access_token', ''); 
                                          navigate('/');}}>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <a href="/" className="notif_button float-right">
          <img src={bell} alt="Notification Bell" />
        </a>
      </header>
    </>
  );
}

export default Navbar;
