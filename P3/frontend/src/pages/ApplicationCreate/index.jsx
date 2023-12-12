import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

import AreYouSureModal from '../../components/AreYouSureModal';
import CreateUpdateApplicationForm from '../../components/CreateUpdateApplicationForm';

import "./ApplicationCreate.css";

export default function CreateApplication() {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    
    return (
        <main>
            <CreateUpdateApplicationForm method="post" />
        </main>
    )
}