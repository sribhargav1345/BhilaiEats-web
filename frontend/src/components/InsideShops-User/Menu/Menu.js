import React from 'react';
import "./Menu.css";

// Belong to Add To Cart
import { useDispatch } from "react-redux";
import { addToCart } from '../../../redux/CartSlice';

import unavailable from "../../../Assests/Unavailable.png";
import vegIcon from "../../../Assests/veg-icon.png";
import nonvegIcon from "../../../Assests/non-veg-icon.png";

const MenuItem = ({ item }) => {

  const dispatch = useDispatch();     // This will store items in store file in redux.
  
  return (
    <div>
      <div className="menu-item m-3">
        <div className="menu-item-image">
          {item.image ? (
            <img src={item.image} alt={item.name} className='item-image-menu' />
          ) : (
            <img src={unavailable} alt={item.name} />
          )}
        </div>
        <div className="menu-item-details">
          <div className='d-flex align-items-center'>
            {item.veg !== undefined ? (item.veg === true ? <img src={vegIcon} alt="Veg" id='icon-veg' /> : <img src={nonvegIcon} alt="non-veg" id='icon-veg' />) : (null)}
            <h3 className='ms-2'>{item.name}</h3>
          </div>
          <div className='d-flex'>
            <p>₹{item.price}</p>
            {item.quantity !== undefined ? (<span className='ms-2'> for {item.quantity} </span>) : (null)}
          </div>
          <p>{item.description}</p>
          <button className='btn btn-md btn-warning' onClick={() => dispatch(addToCart(item), console.log(item))}>Add</button>
        </div>
      </div>
      <hr className='horizontal-line'/>
    </div>
  );
};

export default MenuItem;
