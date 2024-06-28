import React from 'react';
import "./Login-Admin.css";

import order from "../../Assests/choice3.jpg";
import LoginForm from "../../components/Login/Login";

export default function Login() {

    return (
        <div className='d-flex flex-row'>
            <div className='picture'>
                <img src={order} alt="dp" style={{ width: '100%', height: '100vh'}}/>
            </div>
            <div className='cards'>
                <LoginForm />
            </div>
        </div>
    )
}