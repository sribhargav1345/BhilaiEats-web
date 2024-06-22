import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../../Assests/Logo.png";
import UserIcon from "../../Assests/user.png";

export default function Navbar({ page }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 468);
    
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 468);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Cookies.remove('authToken'); 
            } 
            else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div data-testid="Navbar-test">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">

                    <div className="items">

                        <img src={Logo} alt="." className="navbar-logo" />
                        <Link className="navbar-brand fs-3 fst-italic heading" to="/">
                            BhilaiEats
                        </Link>

                        {isSmallScreen && (
                            <button className="navbar-toggler ml-auto" type="button" onClick={toggleMenu}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        )}

                        <div className={"collapse navbar-collapse" + (menuOpen ? " show" : "")} id="navbarSupportedContent">
                            
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                {page === "User" && Cookies.get('authToken') && (
                                    <div className="d-flex align-items-center">
                                        <li className="nav-item">
                                            <div className="btn bg-white text-danger" onClick={handleLogout}>
                                                Logout
                                            </div>
                                        </li>
                                        <div className="btn bg-white text-success mx-2">
                                            My Cart
                                        </div>
                                        <li className="nav-item">
                                            <Link to="/userProfile" className="mx-2" title="Profile">
                                                <img src={UserIcon} alt="User" className="navbar-profile" />
                                            </Link>
                                        </li>
                                    </div>
                                )}

                                {page === "SuperAdmin" && Cookies.get('authToken') && (
                                    <div className="d-flex align-items-center">
                                        <li className="nav-item">
                                            <div className="btn bg-white text-danger" onClick={handleLogout}>
                                                Logout
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/userProfile" className="mx-2" title="Profile">
                                                <img src={UserIcon} alt="User" className="navbar-profile" />
                                            </Link>
                                        </li>
                                    </div>
                                )}

                                {(page === "None") && (
                                    <div className="elements">
                                        <Link to="/signup" className="btn bg-white text-success mx-2"> Signup </Link>
                                        <Link to="/login" className="btn bg-white text-success mx-2"> Login </Link>
                                    </div>
                                )}

                                {page === "Login" && (
                                    <div className="ms-auto">
                                        <Link to="/signup" className="btn bg-white text-success mx-2"> Signup </Link>
                                    </div>
                                )}

                                {page === "Signup" && (
                                    <div className="ml-auto">
                                        <Link to="/login" className="btn bg-white text-success mx-2"> Login </Link>
                                    </div>
                                )}

                                {page === "Owner" && (
                                    <div className="ml-auto">
                                        <Link to="/order-requests" className="btn bg-white text-success mx-2"> Order Requests </Link>
                                        <div className="btn bg-white text-success mx-2" onClick={handleLogout}>
                                            Logout
                                        </div>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
