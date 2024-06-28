import React from 'react';
import { useSelector } from 'react-redux';

export default function Checkout() {

    const cartItems  = useSelector( state => state.cart.cartItems);
    //console.log(cartItems);
    return (
        <div>
            <h2> CartItems </h2>
            {cartItems.map((item) => {
                return(
                    <div className='d-flex'>
                        <img src={item.image} alt="" />
                        <div>
                            <h4>{item.name}</h4>
                            <button className='btn btn-warning btn-sm'> Remove </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
