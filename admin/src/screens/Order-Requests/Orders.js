import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { getUserFromToken } from '../../utils';

import "./Orders.css";

import Navbar from '../../components/OrderRequests/Navbar/Navbar';
import Ordering from '../../components/OrderRequests/Orders/Orders';

const SOCKET_URL = 'https://bhilaieats-web.onrender.com';
const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  secure: true
});

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getUserFromToken();
    if (token) {
      const shopName = token.shopname;

      socket.emit('join-shop', shopName);

      socket.on('order-received', (order) => {
        console.log('New order received:', order);
        setOrders(prevOrders => [...prevOrders, order]);
      });

      // Listen for order updates
      socket.on('order-updated', (updatedOrder) => {
        setOrders(prevOrders => prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        ));
      });

      // Cleanup on component unmount
      return () => {
        socket.off('order-received');
        socket.off('order-updated');
      };
    }
  }, []);

  const acceptOrder = (order) => {
    socket.emit('accept-order', order._id, order.shop.name, order.user.contact);
  };

  const rejectOrder = (order) => {
    socket.emit('reject-order', order._id, order.shop.name, order.user.contact);
  };

  return (
    <div>
      <Navbar />
      <div className='orders-page'>
        <div className='order-requests'>
          <h4>Order Requests</h4>
          <hr id="line" />
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-item">
                <Ordering order={order} />
                <button onClick={() => acceptOrder(order)}>Accept</button>
                <button onClick={() => rejectOrder(order)}>Reject</button>
              </div>
            ))
          )}
        </div>
        <div className='requests-accepted'>
          <h4>Accepted Requests</h4>
          {/* Show accepted requests if you want to separate them */}
        </div>
      </div>
    </div>
  );
}
