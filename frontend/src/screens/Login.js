import React, { useState } from 'react';
import Cookies from "js-cookie";

import { Link, useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";

export default function Login() {

    const [cred, setCred] = useState({ email: "", password: "", userType: "user" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        let apiUrl = "";
        if (cred.userType === "user") {
            apiUrl = "http://localhost:5000/api/loginUser";
        }
        else if (cred.userType === "admin") 
        {
            if (cred.email === "sribhargavof03@gmail.com" || cred.email === "mitulvardhan@iitbhilai.ac.in") {
                apiUrl = "http://localhost:5000/api/loginSuperAdmin";
                console.log("I'm a SuperAdmin");
            }
            else {
                apiUrl = "http://localhost:5000/api/loginAdmin";
                console.log("I'm an admin");
            }
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });

        const result = await response.json();

        if (!result.success) {
            alert("Enter Valid Credentials");
            return;
        }

        Cookies.set("userType", cred.userType);
        Cookies.set("userEmail", cred.email);
        Cookies.set("authToken", result.authToken);
        Cookies.set("shopname", result.shopname);

        if (apiUrl === "http://localhost:5000/api/loginAdmin") {
            const ownersResponse = await fetch("http://localhost:5000/api/owners");
            const ownersData = await ownersResponse.json();

            for (const ownerArray of ownersData) {
                for (const owner of ownerArray) {
                    if (owner.email === cred.email) {
                        console.log("Owner found:", owner);
                        navigate(`/owner/${owner._id}`);
                        return;
                    }
                }
            }
        } else if (apiUrl === "http://localhost:5000/api/loginSuperAdmin") {
            navigate('/superadmin');
            return;
        }

        navigate("/user");

    };

    const onChange = (event) => {
        setCred({ ...cred, [event.target.name]: event.target.value });
    };

    return (
        <div className='coloring'>
            <div className='login-container'>
                
                <Navbar page={Login} />
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-5">
                            <div className="card-responsiveness d-flex flex-row" style={{ width: "44vw" }}>

                                <div className="login-image d-none d-lg-block d-xl-block">
                                    <img src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2QlMjBib3dsfGVufDB8fDB8fHww" alt="Login" style={{ height: "510px", width: "320px" }} />
                                </div>

                                <div>

                                    <div className="card-header bg-white">
                                        <h2 className="text-center mt-2">Login</h2>
                                    </div>

                                    <div className='card-body'>

                                        <form onSubmit={handleSubmit}>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" className="form-control" name='email' value={cred.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" name='password' value={cred.password} onChange={onChange} id="exampleInputPassword1" />
                                            </div>

                                            <div className='mb-3'>
                                                <label htmlFor="userType" className="form-label">User Type</label>
                                                <select className="form-control custom-select" name="userType" value={cred.userType} onChange={onChange}>
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>

                                            <button type="submit" className="btn btn-success w-100 mb-3">Submit</button>
                                            <p className="text-center mb-0">New User? <Link to="../signup">Sign Up</Link></p>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
