import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './SignUp.css';

import book_icon from "../../Assests/Logo.png";

const SignUpForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://bhilaieats-web.onrender.com/api/auth/Admin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, code })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to create user");
            return;
        }

        alert("User Created Successfully");
        console.log(result);
        
        setEmail('');
        setPassword('');
        setCode('');

        navigate("/");
    };

    return (
        <div className='complete2'>
            <div className="signup-container">
                <div className="signup-card">
                    <div className='d-flex flex-row'>
                        <img src={book_icon} alt="icon" style={{ height: '30px', width: '30px' }} />
                        <h2 className="signup-title ms-3">IIT Bhilai Delivery Service</h2>
                    </div>
                    <h5 className='mb-2'>Register with your account</h5>
                    <p className='signup-login'>Aldready have an account? <a href="/login">Login</a></p>

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

                        <div className="form-group">
                            <label htmlFor="contact">Code</label>
                            <input
                                type="name"
                                id="code"
                                placeholder="Enter Code provided by SuperAdmin"
                                value={code}
                                onChange={handleCodeChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn mb-3"> Submit </button>
                        <p className='signup-textp'>Are you a User? <a href="/register">SignUp here</a></p>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;