import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';

import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; 

import Logo from "../../../Assests/Logo.png";
import UserIcon from "../../../Assests/user.png";
import cart from "../../../Assests/cart.png";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 468);

    const cartItems = useSelector(state => 
        state.cart.cartItems
    );

    useEffect(() => {

        const checkAuthToken = () => {
            const token = Cookies.get('authToken');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                const userType = decodedToken?.user?.type;
    
                if (!userType) {
                    setIsAuthenticated(false);
                    Cookies.remove('authToken');
                    alert("Invalid Token");
                } 

                if (decodedToken.exp > currentTime){
                    setIsAuthenticated(true);
                } 
                else {
                    Cookies.remove('authToken');
                    console.log("Token Expired");
                    setIsAuthenticated(false);
                }
            } 
            catch (error) {
                console.error('Error decoding token:', error);
                Cookies.remove('authToken');
                setIsAuthenticated(false);
            }
        };

        checkAuthToken();

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
                setIsAuthenticated(false); 
            } else {
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
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                {isAuthenticated ? (
                                    <div className="d-flex align-items-center">
                                        <li className="nav-item">
                                            <div className="btn bg-white text-danger" onClick={handleLogout}>
                                                Logout
                                            </div>
                                        </li>
                                        <div className="mx-2 cart-icon">
                                            <Link to="/checkout">
                                                <img src={cart} alt="cart" className="cart-icon-pic" id="carticonpic"/>
                                                <span className="cart-icon-count"> {cartItems.length} </span>
                                            </Link>
                                        </div>
                                        <li className="nav-item">
                                            <Link to="/userProfile" className="mx-2" title="Profile" id="profile-icon">
                                                <img src={UserIcon} alt="User" className="navbar-profile" id="profile-icon"/>
                                            </Link>
                                        </li>
                                    </div>
                                ) : (
                                    <div className="elements">
                                        <Link to="/register" className="btn bg-white text-success mx-2"> Signup </Link>
                                        <Link to="/login" className="btn bg-white text-success mx-2"> Login </Link>
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
