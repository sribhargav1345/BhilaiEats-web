import React, { useState, useEffect } from 'react';
import './Checkout.css';

import { useSelector } from 'react-redux';
// import { loadStripe } from "@stripe/stripe-js";

import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

import OrderItem from '../../components/Checkout/OrderItem/OrderItem';
import BillDetails from '../../components/Checkout/BillDetails/BillDetails';
import Navbar from '../../components/Checkout/Navbar/Navbar';
import CardShop from '../../components/Checkout/CardShop/CardShop';
import cartempty from "../../Assests/cartempty.png";

import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const socket = io('https://bhilaieats-web.onrender.com');

export default function Checkout() {

    const items = useSelector(state => state.cart.cartItems);
    const shop = useSelector(state => state.cart.shop);

    const [user, setUser] = useState(null);

    const total = items.reduce((sum, item) => sum + item.price * item.qnty, 0);
    const deliveryFee = 2.50;
    const GSTfee = 0.03 * (total);

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setUser({
                name: decodedToken.user.name,
                email: decodedToken.user.email,
                contact: decodedToken.user.contact,
            });

            socket.emit('join-user', decodedToken.user.contact);
        }
    }, []);

    const placeOrder = () => {
        const order = {
            items,
            shop,
            user: {
                name: user.name,
                email: user.email,
                contact: user.contact
            },
            status: 'pending'
        };
        socket.emit('place-order', order);

        console.log("Your request is sent to the owner")
    };

    const handlePlaceOrder = () => {
        confirmAlert({
            title: 'Confirm to place order',
            message: `Are you sure you want to place an order of ₹${total+deliveryFee+GSTfee}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => placeOrder()
                },
                {
                    label: 'No',
                    onClick: () => console.log('Order not placed')
                }
            ]
        });
    };

    // const makePayment = async () => {
    //     console.log(process.env.REACT_APP_STRIPE_KEY);
    //     const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

    //     const body = {
    //         products: items
    //     };

    //     const response = await fetch(`https://bhilaieats-web.onrender.com/create-checkout-session`, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify(body)
    //     });

    //     const session = await response.json();

    //     const result = await stripe.redirectToCheckout({
    //         sessionId: session.id
    //     });

    //     if (result.error) {
    //         console.error(result.error.message);
    //     }
    // }

    return (
        <div className='total-checkout'>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="order-summary-container">
                {(items && shop) ? (
                    <div className="order-summary">
                        <CardShop shop={shop} className="shop-checkout" />
                        <div className="item-list">
                            {items.map((item, index) => (
                                <OrderItem key={index} item={item} />
                            ))}
                        </div>
                        <BillDetails total={total} deliveryFee={deliveryFee} GSTfee={GSTfee} />
                        <button className='checkout-btn' onClick={handlePlaceOrder}> Place Order </button>
                        {/* <button className="checkout-btn" onClick={makePayment}>Proceed to Payment</button> */}
                    </div>
                ) : (
                    <div className='cartisempty'>
                        <img src={cartempty} alt='Your Cart is Empty' />
                        <Link to="/"> <button type='button' className='btn btn-success button-to-home'> Go To Home Page</button> </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
