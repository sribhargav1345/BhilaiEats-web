import React from 'react';
import "./Footer.css";

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-start">
            <div className="container">
                <div className="row" >
                    <div className="col-md-4">
                        <h5>Customer Support</h5>
                        <ul className="list-unstyled text-colors">
                            <li>FAQs</li>
                            <li>Contact Us</li>
                            <li>Feedback</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className=" text-colors text-decoration-none">Menu</Link></li>
                            <li><Link to="/" className="text-colors text-decoration-none">About</Link></li>
                            <li><Link to="/contact" className="text-colors text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <address className="text-colors">
                            Kanhar Hostel<br />
                            IIT Bhilai, Chhatisgarh<br />
                            Email: bollapragadasri@iitbhilai.ac.in<br />
                            Phone: 7989912068
                        </address>
                    </div>
                </div>
                <hr className="bg-light" />
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>&copy; 2024 BhilaiEats, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
