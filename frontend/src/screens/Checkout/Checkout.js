import React from 'react';
import './Checkout.css';

import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";

import OrderItem from '../../components/Checkout/OrderItem/OrderItem';
import BillDetails from '../../components/Checkout/BillDetails/BillDetails';
import Navbar from '../../components/Checkout/Navbar/Navbar';

export default function Checkout() {

    const items = useSelector(state => state.cart.cartItems);

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.50;
    const platformFee = 5.00;

    const makePayment = async () => {

        console.log(process.env.REACT_APP_STRIPE_KEY);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    
        const body = {
            products: items
        };
    
        const response = await fetch(`http://localhost:5000/create-checkout-session`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        });
    
        const session = await response.json();
    
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
    
        if (result.error) {
            console.error(result.error.message);
        }
    }
    

    return (
        <div className='total-checkout'>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="order-summary-container">
                <div className="order-summary">
                    <div className="item-list">
                        {items.map((item, index) => (
                            <OrderItem key={index} name={item.name} price={item.price} />
                        ))}
                    </div>
                    <BillDetails total={total} deliveryFee={deliveryFee} platformFee={platformFee} />
                    <button className="checkout-btn" onClick={makePayment}>Proceed to Payment</button>
                </div>
            </div>
        </div>
    );
}
