import React, { useState, useEffect } from 'react';
import './Checkout.css';

import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

import OrderItem from '../../components/Checkout/OrderItem/OrderItem';
import BillDetails from '../../components/Checkout/BillDetails/BillDetails';
import Navbar from '../../components/Checkout/Navbar/Navbar';
import CardShop from '../../components/Checkout/CardShop/CardShop';
import cartempty from "../../Assests/cartempty.png";

import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSocket } from '../../context/socket-context'; 

export default function Checkout() {
    const items = useSelector(state => state.cart.cartItems);
    const shop = useSelector(state => state.cart.shop);

    const [user, setUser] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);

    const total = items.reduce((sum, item) => sum + item.price * item.qnty, 0);
    const deliveryFee = 2.50;
    const GSTfee = 0.03 * (total);

    const socket = useSocket();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentUser = {
                name: decodedToken.user.name,
                email: decodedToken.user.email,
                contact: decodedToken.user.contact,
            };
            setUser(currentUser);

            if (socket && currentUser.contact) {

                socket.emit('join-user', currentUser.contact);
                console.log(`Joined room for user: user-${currentUser.contact}`);

                socket.on('accept-order', (order) => {
                    console.log('Order Accepted:', order);
                    setOrderStatus('accepted');
                });

                socket.on('reject-order', (order) => {
                    console.log('Order Rejected:', order);
                    setOrderStatus('rejected');
                });
            }
        }
    }, [socket]);

    const placeOrder = () => {
        if (socket && user) {
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
            socket.emit('placeOrder', order);
            console.log("Order request sent to the shop owner");
        }
    };

    const handlePlaceOrder = () => {
        confirmAlert({
            title: 'Confirm to place order',
            message: `Are you sure you want to place an order of ₹${total + deliveryFee + GSTfee}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => placeOrder()
                },
                {
                    label: 'No',
                    onClick: () => alert('Order not placed')
                }
            ]
        });
    };

    return (
        <div className='total-checkout'>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="order-summary-container">
                {(items.length > 0 && shop) ? (
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
                        {orderStatus && (
                            <div className={`order-status ${orderStatus}`}>
                                Order Status: {orderStatus === 'accepted' ? 'Accepted' : 'Rejected'}
                            </div>
                        )}
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
