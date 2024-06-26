import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import GoogleLoginButton from "./GoogleLogin";

import './Login.css';

import logo from "../../Assests/Logo.png";

const LoginForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        await response.json();

        if(!response.ok){
            alert("Enter Valid Credentials");
            return;
        }

        const verify = Cookies.get();
        console.log(verify);

        console.log("Successfull");
        navigate("/");
    };

    return (
        <div className='complete'>
            <div className="login-container">
                <div className="login-card">
                    <div className='d-flex flex-row'>
                        <img src={logo} alt="icon" style={{ height: '30px', width: '30px'}}/>
                        <h2 className="login-title"> IIT Bhilai Delivery Service </h2>
                    </div>
                    <h5 className='login-text'>Log in to your account</h5>
                    <p className='login-texts'>Don't have an account? <a href="/register">Sign Up</a></p>

                    <GoogleLoginButton />

                    <div className="divider">
                        <hr />
                        <span>Or with email and password</span>
                        <hr />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn mb-3"> Submit </button>
                        <p className='login-textp'>Are you a ShopOwner? <a href="/login-Admin">Login here</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;