// need a button to connect it to
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AccountDeletion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = 'http://127.0.0.1:8000'; // change after deployment

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        fetch(`${url}/accounts/user/${id}/deletion/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }) 
        .then(res => {
            if (!res.ok) {
                navigate('*');
            } else {
                navigate('/');
            }
        })
    }, [id]);
}