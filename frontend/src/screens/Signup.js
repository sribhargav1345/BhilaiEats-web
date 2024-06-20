import React, { useState } from 'react';
import Cookies from "js-cookie";

import { Link, useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";

export default function SignUp() {

    const [cred, setCred] = useState({ name: "", email: "", contact: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = "http://localhost:5000/api/CreateUser";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: cred.name,
                email: cred.email,
                password: cred.password,
                contact: cred.contact
            })
        });

        const result = await result.json();

        if (!result.success) {
            alert("Failed to create User. Please check input and try again");
        }
        else {
            alert("User created successfully!");

            let apiUrl = "http://localhost:5000/api/loginUser";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: cred.email, password: cred.password })
            });

            const json = await response.json();

            if (!json.success) {
                alert("Enter Valid Cred");
                return;
            }

            Cookies.set("userEmail", cred.email);
            Cookies.set("authToken", json.authToken);
            Cookies.set("shopname", json.shopname);

            navigate("/user");
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCred({ ...cred, [name]: value })
    };

    return (
        <div className='login-container'>

            <Navbar page={SignUp} />

            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="card d-flex flex-row">

                            <div className="login-image d-none d-lg-block d-xl-block">
                                <img src="https://images.unsplash.com/photo-1586511934875-5c5411eebf79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGJvd2x8ZW58MHx8MHx8fDA%3D" alt="Signup" />
                            </div>

                            <div>
                                <div className='card-header'>
                                    <h2 className="text-center mb-4">Sign Up</h2>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" name='name' value={cred.name} onChange={onChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input type="email" className="form-control" name='email' value={cred.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type="password" className="form-control" name='password' value={cred.password} onChange={onChange} id="exampleInputPassword1" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                            <input type="text" className="form-control" name='contactNumber' value={cred.contactNumber} onChange={onChange} />
                                        </div>

                                        <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                        <p className="text-center mb-0">Already have an account? <Link to="../login">Login</Link></p>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}