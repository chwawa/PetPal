import Footer from "../Footer"
import "./InitialPageLayout.css"
import logo from "../../assets/logo.svg"
import { Outlet } from "react-router-dom"

export default function LoginPageLayout() {
    return (
        <div class="layout">
            <header>
                <a href="/" className="logo">
                    PetPal
                    <img src={logo} className="logo_image"/>
                </a>
            </header>
            <Outlet />
            <Footer />
        </div>
    )
}