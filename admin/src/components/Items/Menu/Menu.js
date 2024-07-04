// MenuItem.js
import React, { useState } from 'react';
import "./Menu.css";

import unavailable from "../../../Assests/Unavailable.png";
import vegIcon from "../../../Assests/veg-icon.png";
import nonvegIcon from "../../../Assests/non-veg-icon.png";

import EditItem from './Edit_Item';

const MenuItem = ({ item, handleRemoveItem }) => {
  
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handlePopupClose = () => {
    setShowEditPopup(false);
  };

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
            {item.veg !== undefined ? (
              item.veg === true ? (
                <img src={vegIcon} alt="Veg" id='icon-veg' />
              ) : (
                <img src={nonvegIcon} alt="non-veg" id='icon-veg' />
              )
            ) : (null)}
            <h3 className='ms-2'>{item.name}</h3>
          </div>
          <div className='d-flex'>
            <p>₹{item.price}</p>
            {item.quantity && item.quantity !== undefined ? (
              <span className='ms-2'> for {item.quantity} </span>
            ) : (null)}
          </div>
          <p>{item.description}</p>
          <div className='d-flex'>
            <button className='btn btn-md btn-warning me-2' onClick={handleEditClick}>Edit</button>
            <button className='btn btn-md btn-danger' onClick={handleRemoveItem}>Remove</button>
          </div>
        </div>
      </div>
      <hr className='horizontal-line' />
      {showEditPopup && (
        <EditItem 
          item={item}
          handlePopupClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default MenuItem;
