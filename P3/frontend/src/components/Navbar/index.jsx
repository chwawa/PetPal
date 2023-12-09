import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.svg"
import bell from "../../assets/notif_bell.svg"
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Offcanvas from 'react-bootstrap/Offcanvas';

import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const location = useLocation();
    const currURL = location.pathname;
    const user = localStorage.getItem("usertype");
    const id = localStorage.getItem("id");
    const Navigate = useNavigate();
    const [bars, setBars] = useState(false)

    return (
      <>
        <header>
          <Link to="/" className="logo">
            PetPal
            <img src={logo} className="logo_image"/>
          </Link>

          <Link to="/" className={(currURL === "/" || currURL.startsWith("/pets")) ? "active link" : "link"}>
            Home
          </Link>

          {/* Change to My Applications is seeker; My Pets if shelter */}
          {user == "shelter"
            ? <Link to="/mypets" className={currURL.startsWith("/mypets") ? "active link" : "link"}>
                My Pets
              </Link>
            : <Link to="/applications" className={currURL.startsWith("/applications") ? "active link" : "link"}>
                My Applications
              </Link>
          }
          
          <Dropdown className="myprofile float-right">
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
                <Link to={`/profile/update/${id}`} className="myprofile-link">
                  Edit Profile
                </Link>
              </Dropdown.Item>
                
              <Dropdown.Divider />
              <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="/notifications" className={currURL === "/notifications" ? "active link notif_button float-right" : "link notif_button float-right"}>
            <img src={bell} />
          </Link>

          {/* Show if screen is small */}
          <FontAwesomeIcon icon={faBars} className="bars float-right" onClick={() => setBars(true)}/>
          <Offcanvas show={bars} placement="end" onHide={() => setBars(false)}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>PetPal</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Link to="/" className="offcanvas-link">
                <p>Home</p>
              </Link>
              {user == "shelter"
                ? <Link to="/mypets" className="offcanvas-link">
                    <p>My Pets</p>
                  </Link>
                : <Link to="/applications" className="offcanvas-link">
                    <p>My Applications</p>
                  </Link>
              }
              <Link to={`/profile/${id}`} className="offcanvas-link">
                <p>View Profile</p>
              </Link>
              <Link to={`/profile/update/${id}`} className="offcanvas-link">
                <p>Edit Profile</p>
              </Link>
              <Link to={""} className="offcanvas-link">
                <p>Log Out</p>
              </Link>
            </Offcanvas.Body>
          </Offcanvas>

        </header>
      </>
    );
  }
  
  export default Navbar;