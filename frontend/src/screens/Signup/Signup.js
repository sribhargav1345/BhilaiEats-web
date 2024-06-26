import React from 'react';
import "./Signup.css";

import book_bg from "../../Assests/choice3.jpg";
import SignUpForm from "../../components/Signup/Signup";

export default function Login() {

    return (
        <div className='d-flex flex-row'>
            <div className='picture'>
                <img src={book_bg} alt="dp" style={{ width: '100%', height: '100vh'}}/>
            </div>
            <div className='cards'>
                <SignUpForm />
            </div>
        </div>
    )
}