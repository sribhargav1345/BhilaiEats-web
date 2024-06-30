import React from 'react';
import './OrderItem.css';  // Assuming you have a dedicated CSS file for the OrderItem component

import vegi from "../../../Assests/veg-icon.png";
import nonveg from "../../../Assests/non-veg-icon.png";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../../../redux/CartSlice";

export default function OrderItem({ item, quantity }) {

    const shop = useSelector(state => state.cart.shop);

    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <div className='d-flex align-items-center'>
                {item.veg !== undefined? (item.veg === true? (<img src={vegi} alt='.' className='vegimagecart'/>):(<img src={nonveg} alt='.' className='vegimagecart'/>)):(null)}
                <span className="cart-item-name">{item.name}</span>
            </div>
            <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => dispatch(removeFromCart(item))}>-</button>
                <input type="number" className="quantity-input" value={item.quantity} readOnly />
                <button className="quantity-btn" onClick={() => dispatch(addToCart({item,shop}))}>+</button>
            </div>
            <span className="cart-item-price">₹{item.price}</span>
        </div>
    );
}
