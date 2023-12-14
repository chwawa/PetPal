import React from 'react';
import './ShelterItem.css';
import { useNavigate } from "react-router-dom";
import shelterProfileImage from '../../assets/pic.jpeg'
import { Button } from 'react-bootstrap';

export default function ShelterItem({ profile, name, email, phone, location, link}) {
  const navigate = useNavigate();
  return (
    <div className="shelter-card">
      <div className="card-img-container">
        <img src={profile || shelterProfileImage} alt="Shelter Profile" className="card-img-top" />
      </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="email">
          <i className="bi bi-envelope"></i>
          <a href={`mailto:${email}`}> {email}</a>
        </div>
        <div className="phone">
          <i className="bi bi-telephone"></i>
          <a href={`tel:${phone}`}> {phone || 'xxx-xxx-xxxx'}</a>
        </div>
        <div className="location">
          <i className="bi bi-geo-alt"></i>
          <a href={`https://maps.google.com/?q=${location}`}> {location || 'City, Province'}</a>
        </div>
        <Button className="learn-more-button pink-button" size="md" variant="light" onClick={() => navigate(link)}>Learn More</Button>
      </div>
    </div>
  );
}




