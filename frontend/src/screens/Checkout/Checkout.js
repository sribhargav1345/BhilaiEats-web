import React, { useState, useEffect } from 'react';
import './Checkout.css';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

import OrderItem from '../../components/Checkout/OrderItem/OrderItem';
import BillDetails from '../../components/Checkout/BillDetails/BillDetails';
import Navbar from '../../components/Checkout/Navbar/Navbar';
import CardShop from '../../components/Checkout/CardShop/CardShop';
import cartempty from "../../Assests/cartempty.png";

import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { clearCart } from '../../redux/CartSlice';

import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Checkout() {
    
    const items = useSelector(state => state.cart.cartItems);
    const shop = useSelector(state => state.cart.shop);

    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);

    const total = items.reduce((sum, item) => sum + item.price * item.qnty, 0);
    const deliveryFee = 2.50;
    const GSTfee = 0.03 * (total);

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
        }
    }, []);

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
        }
    }, []);

    useEffect(() => {
        if (user && user.contact) {
            const fetchOrderStatus = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/orders/status/${user.contact}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    const result = await response.json();
                    if (response.ok) {
                        setOrderStatus(result.order.status);
                    }
        
                } catch (error) {
                    console.error("Error fetching order status", error);
                }
            };

            fetchOrderStatus();
            // Optionally, set an interval to fetch the order status periodically
            const intervalId = setInterval(fetchOrderStatus, 30000); // fetch every 30 seconds

            // Clean up interval on unmount
            return () => clearInterval(intervalId);
        }
    }, [user]);

    const priced = total + GSTfee;

    const placeOrder = async () => {
        if(user && user.email) {
            const order = {
                items,
                shop,
                user: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact
                },
                status: 'pending',
                price: priced
            };

            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(order)
                });

                const result = await response.json();
                if (!result.success || !response.ok) {
                    console.log("Error in creating order");
                    alert("Error in Creating Order, we are under maintenance");
                    return;
                }

                alert("Order Request Sent");
                dispatch(clearCart());

            } catch (err) {
                console.log("Error in creating order", err);
                alert("Error in Creating Order, we are under maintenance");
                return;
            }
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
                    </div>
                ) : (
                    <div className='cartisempty'>
                        <img src={cartempty} alt='Your Cart is Empty' />
                        <Link to="/"> <button type='button' className='btn btn-success button-to-home'> Go To Home Page</button> </Link>
                        <div className='mt-3'>
                            <p> <strong> Order Status: </strong> {orderStatus} </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
