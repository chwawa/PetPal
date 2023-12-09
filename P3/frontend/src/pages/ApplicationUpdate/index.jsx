import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CreateUpdateApplicationForm from "../../components/CreateUpdateApplicationForm";


export default function UpdateApplication() {
    return (
        <main>
            <CreateUpdateApplicationForm method="put" />
        </main>
    )
}