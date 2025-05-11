import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useState } from "react"
import RegistroUsuarios from "../components/RegistroUsuarios"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = ({children}) => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isRegistered, setIsRegistered] = useState(
        !!localStorage.getItem("token")
    );

    const updateRegisterStatus = () => {
        setIsRegistered(!!localStorage.getItem("token"));
    };

    return (
        <ScrollToTop>
            <Navbar
            setShowRegisterModal={setShowRegisterModal}
            isRegistered={isRegistered}
            updateRegisterStatus={updateRegisterStatus}
            />
        <RegistroUsuarios
            registroUsuarios={showRegisterModal}
            setRegistroUsuarios={setShowRegisterModal}
            updateRegisterStatus={updateRegisterStatus}
            />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}