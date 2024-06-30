import React from 'react';
import './OrderItem.css';

import vegi from "../../../Assests/veg-icon.png";
import nonveg from "../../../Assests/non-veg-icon.png";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../../../redux/CartSlice";

export default function OrderItem({ item }) {
    
    const shop = useSelector(state => state.cart.shop);
    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <div className='cart-item-info'>
                {item.veg !== undefined ? (item.veg === true ? (<img src={vegi} alt='.' className='vegimagecart'/>) : (<img src={nonveg} alt='.' className='vegimagecart'/>)) : (null)}
                <span className="cart-item-name">{item.name}</span>
            </div>
            <div className="cart-item-actions">
                <div className="quantity-controls border rounded-md">
                    <button className="btn buttonshere pr-4" onClick={() => dispatch(removeFromCart(item))}>-</button>
                    {item.qnty}
                    <button className="btn buttonshere pr-4" onClick={() => dispatch(addToCart({item, shop}))}>+</button>
                </div>
                <span className="cart-item-price">₹{item.price * item.qnty}</span>
            </div>
        </div>
    );
}
