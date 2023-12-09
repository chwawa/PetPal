
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AreYouSureModal({title, body, show, setShow, petID, deleteAccount}) {
    let navigate = useNavigate();
    const url = 'http://127.0.0.1:8000' // change after deployment
    const accessToken = localStorage.getItem('access_token');

    const handleClose = () => setShow(false);

    async function handleConfirm(event) {
        if (petID) {
            // Need to be authorized
            await fetch(`${url}/pets/${petID}`, {
                method: "delete",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(() => console.log("Delete successful"))

            setShow(false);
            window.location.reload();
            event.stopPropagation();
        
        } else if (deleteAccount) {
            const id = localStorage.getItem("id");
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch(`http://127.0.0.1:8000/accounts/user/${id}/deletion/`, {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                },
            });
            localStorage.clear();
            setShow(false);
            navigate('/');
            event.stopPropagation();
        
        } else {
            navigate(-1);
        }
    }

    return  (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>
                <Button variant="danger" onClick={(event) => handleConfirm(event)}>Confirm</Button>
            </Modal.Footer>
        </Modal>

    )
}
