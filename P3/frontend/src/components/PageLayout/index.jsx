import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"
import Footer from "../Footer"
import "./PageLayout.css"

export default function PageLayout() {
    return (
        <div class="layout">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
