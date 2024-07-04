import React, { useEffect, useState } from 'react';
import "./Menu.css";
import { useDispatch } from "react-redux";
import { addToCart } from '../../../redux/CartSlice';
import { getUserFromToken } from '../../../utils';
import unavailable from "../../../Assests/Unavailable.png";
import vegIcon from "../../../Assests/veg-icon.png";
import nonvegIcon from "../../../Assests/non-veg-icon.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItem = ({ item, shop }) => {
  const dispatch = useDispatch();
  const [userContact, setUserContact] = useState("");

  useEffect(() => {
    const decoded = getUserFromToken();
    if (decoded && decoded.contact) {
      setUserContact(decoded.contact);
    } else {
      console.error('Failed to retrieve user contact from token');
    }
  }, []);

  const handleAddToCart = () => {
    const decoded = getUserFromToken();
    if (!decoded || !decoded.contact) {
      toast.error("Please login as a customer to add items to the cart", {
        position: "top-right",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart({ item, shop, user_contact: decoded.contact }));
    }
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
            {item.veg !== undefined ? (item.veg === true ? <img src={vegIcon} alt="Veg" id='icon-veg' /> : <img src={nonvegIcon} alt="non-veg" id='icon-veg' />) : (null)}
            <h3 className='ms-2'>{item.name}</h3>
          </div>
          <div className='d-flex'>
            <p>₹{item.price}</p>
            {item.quantity !== undefined ? (<span className='ms-2'> for {item.quantity} </span>) : (null)}
          </div>
          <p>{item.description}</p>
          <button className='btn btn-md btn-warning' onClick={handleAddToCart}>Add</button>
        </div>
      </div>
      <hr className='horizontal-line' />
      <ToastContainer />
    </div>
  );
};

export default MenuItem;
