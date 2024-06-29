import React from 'react';
import './Checkout.css';

import { useSelector } from 'react-redux';

import OrderItem from '../../components/Checkout/OrderItem/OrderItem';
import BillDetails from '../../components/Checkout/BillDetails/BillDetails';
import Navbar from '../../components/Checkout/Navbar/Navbar';

export default function Checkout() {
    const items = useSelector(state => state.cart.cartItems);

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.50;
    const platformFee = 5.00;

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
                    <button className="checkout-btn">Proceed to Payment</button>
                </div>
            </div>
        </div>
    );
}
