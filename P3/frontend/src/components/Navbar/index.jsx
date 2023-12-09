import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";

import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AreYouSureModal from "../AreYouSureModal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo.svg";
import bell from "../../assets/notif_bell.svg";

import "./Navbar.css"


function Navbar() {
    const location = useLocation();
    const currURL = location.pathname;
    const user = localStorage.getItem("usertype");
    const id = localStorage.getItem("id");

    const [bars, setBars] = useState(false)
    const [show, setShow] = useState(false)

    const navigate = useNavigate();

    // const handleDeleteAccount = async () => {
      // const accessToken = localStorage.getItem('access_token');
      // const response = await fetch(`http://127.0.0.1:8000/accounts/user/${id}/deletion/`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // navigate('/')
    // };

    return (
      <>
        <AreYouSureModal 
          title={"Delete Account?"}
          body={"We're sad to see you go :("}
          show={show}
          setShow={setShow}
          deleteAccount={true}
        />

        <header>
          <Link to="/" className="logo">
            PetPal
            <img src={logo} className="logo_image"/>
          </Link>

          <Link to="/" className={(currURL === "/" || currURL.startsWith("/pets")) ? "active link" : "link"}>
            Home
          </Link>

          {/* Change to My Applications is seeker; My Pets if shelter */}
          { localStorage.getItem("access_token")
            ? ( user == "shelter"
                ? <Link to="/mypets" className={currURL.startsWith("/mypets") ? "active link" : "link"}>
                    My Pets
                  </Link>
                : <Link to="/applications" className={currURL.startsWith("/applications") ? "active link" : "link"}>
                    My Applications
                  </Link>
              ) 
            : null}

          <Link to="/shelters" className={(currURL.startsWith("/shelters")) ? "active link" : "link"}>
            All Shelters
          </Link>
          
          { localStorage.getItem("access_token")
            ? (<><Dropdown className="myprofile float-right">
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

                  <Dropdown.Item onClick={() => setShow(true)}>
                    Delete Account
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={() => {localStorage.clear(); navigate('/');}}>
                    Log Out
                </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Link to="/notifications" className={currURL === "/notifications" ? "active link notif_button float-right" : "link notif_button float-right"}>
                <img src={bell} />
              </Link></>
              ) 
            : <Button 
                className="myprofile float-right" 
                variant="light"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>}

          
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
              <Link to="/shelters" className="offcanvas-link">
                <p>All Shelters</p>
              </Link>
              <hr></hr>
              <Link to="/notifications" className="offcanvas-link">
                <p>Notifications</p>
              </Link>
              <Link to={`/profile/${id}`} className="offcanvas-link">
                <p>View Profile</p>
              </Link>
              <Link to={`/profile/update/${id}`} className="offcanvas-link">
                <p>Edit Profile</p>
              </Link>
              <hr></hr>
              <Link className="offcanvas-link" onClick={() => setShow(true)}>
                <p>Delete Account</p>
              </Link>
              <hr></hr>
              <Link to={"/"} className="offcanvas-link" onClick={() => {localStorage.clear(); navigate('/');}}>
                <p>Log Out</p>
              </Link>
            </Offcanvas.Body>
          </Offcanvas>
      </header>
    </>
  )
}

export default Navbar;
