import React from 'react';
import './OrderItem.css';  // Assuming you have a dedicated CSS file for the OrderItem component

export default function OrderItem({ name, price, quantity, onIncrement, onDecrement }) {
    return (
        <div className="cart-item">
            <span className="cart-item-name">{name}</span>
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={onDecrement}>-</button>
                <input type="number" className="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn" onClick={onIncrement}>+</button>
            </div>
            <span className="cart-item-price">₹{price}</span>
        </div>
    );
}
