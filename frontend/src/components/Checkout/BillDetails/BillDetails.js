import React from 'react';
import './BillDetails.css';

const BillDetails = ({ total, deliveryFee, GSTfee }) => {
  const totalPrice = total + deliveryFee + GSTfee;

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
        <span>GST Fee</span>
        <span>₹{GSTfee}</span>
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
