import React, { useEffect, useState } from 'react';
import { getUserFromToken } from '../../utils';

import "./Orders.css";

import Navbar from '../../components/OrderRequests/Navbar/Navbar';
import Ordering from '../../components/OrderRequests/Orders/Orders';

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    const owner = getUserFromToken();

    if(owner){
      const loadOrders = async() => {
        const response = await fetch(`https://bhilaieats-web.onrender.com/api/orders/shop/${owner.contact}` , {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if(!result.success || !response.ok){
          alert("Error in Fetching Orders");
          return;
        }

        setOrders(result.orders);
      };
      loadOrders();

      const loadAccepted = async() => {
        const response = await fetch(`https://bhilaieats-web.onrender.com/api/orders/shop-accepted/${owner.contact}` , {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if(!result.success || !response.ok){
          alert("Error in Fetching Orders");
          return;
        }

        setAccepted(result.orders);
      };
      loadAccepted();

    }
  },[orders]);

  return (
    <div>
      <Navbar />
      <div className='orders-page'>
        <div className='order-requests'>
          <h4>Order Requests</h4>
          <hr id="line" />
          <div className="order-list">
            {orders.length === 0 ? (
              <h5 style={{ marginLeft: '20vw'}}> No Orders Received </h5>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order-item">
                  <Ordering order={order} />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='requests-accepted'>
          <h4>Accepted Requests</h4>
          <hr id="line2" />
          <div className="accepted-list">
              {accepted.map((order) => (
                <div key={order._id} className="accepted-item">
                  <Ordering order={order} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
