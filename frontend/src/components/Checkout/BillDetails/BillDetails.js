import React from 'react';
import './BillDetails.css';

const BillDetails = ({ total, deliveryFee, platformFee }) => {
  const totalPrice = total + deliveryFee + platformFee;

  return (
    <div className="bill-details">
      <div className="bill-item">
        <span>Item Total</span>
        <span>₹{total}</span>
      </div>
      <div className="bill-item">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>
      <div className="bill-item">
        <span>Platform Fee</span>
        <span>₹{platformFee}</span>
      </div>
      <hr />
      <div className="bill-item">
        <strong>To Pay</strong>
        <strong>₹{totalPrice}</strong>
      </div>
    </div>
  );
};

export default BillDetails;
