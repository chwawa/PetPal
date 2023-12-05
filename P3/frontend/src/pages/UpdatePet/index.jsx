import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CreateUpdatePetForm from "../../components/CreateUpdatePetForm";


export default function UpdatePet() {
    return (
        <main>
            <CreateUpdatePetForm method="put" />
        </main>
    )
}