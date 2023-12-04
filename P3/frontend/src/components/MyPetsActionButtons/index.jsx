import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function MyPetsActionButtons() {
    let navigate = useNavigate();
    
    return (
        <>
            <Button style={{ marginRight: 5 }} variant="warning">View Apps</Button>
            <Button variant="light">Edit</Button>
        </>
    )
}