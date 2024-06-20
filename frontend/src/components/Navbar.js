import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Modal from "../../components/Modal";
import Logo from "../assets/Logo.png";
import UserIcon from "../assets/user.png";

export default function Navbar({ page }) {

    const [cartView, setCartView] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        } 
        catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div data-testid="Navbar-test">
            <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
                <div className="container-fluid">

                    <div className="d-flex align-items-center">
                        
                        <img src={Logo} alt="." className="navbar-logo" />
                        <Link className="navbar-brand fs-2 fst-italic mx-3" to="/">
                            BhilaiEats
                        </Link>
                        <button className="navbar-toggler ml-auto" type="button" onClick={toggleMenu}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={"collapse navbar-collapse" + (menuOpen ? " show" : "")} id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {page === "User" && (
                                    <div className="d-flex align-items-center">
                                        <li className="nav-item">
                                            <div className="btn bg-white text-danger" onClick={handleLogout}>
                                                Logout
                                            </div>
                                        </li>
                                        <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>
                                            My Cart
                                        </div>
                                        <li className="nav-item">
                                            <Link to="/userProfile" className="mx-2" title="Profile">
                                                <img src={UserIcon} alt="User" className="navbar-profile" />
                                            </Link>
                                        </li>
                                    </div>
                                )}

                                {page === "SuperAdmin" && Cookies.get('authToken') ? (
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
                                ) : null}

                                {(page === "User" || page === "SuperAdmin") && !Cookies.get('authToken') ? (
                                    <div className="ml-auto">
                                        <Link to="/signup" className="btn bg-white text-success mx-2"> Signup </Link>
                                        <Link to="/login" className="btn bg-white text-success mx-2"> Login </Link>
                                    </div>
                                ) : null}

                                {page === "Login" && (
                                    <div className="ml-auto">
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

                                {cartView && <Modal onClose={() => setCartView(false)}>Cart Content</Modal>}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
