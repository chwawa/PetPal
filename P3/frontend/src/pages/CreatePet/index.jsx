import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

import AreYouSureModal from '../../components/AreYouSureModal';
import CreateUpdatePetForm from '../../components/CreateUpdatePetForm';

import "./CreatePet.css";

export default function CreatePet() {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const shelterID = 1;
    
    return (
        <main>
            <CreateUpdatePetForm method="post" />
        </main>
    )
}