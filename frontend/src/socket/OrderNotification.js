import React, { useEffect, useState } from 'react';
import socket from './socket';

const OrderNotification = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('orderStatusUpdated', (data) => {
      console.log('Order status updated:', data);
      setStatus(`Order ${data.orderId} is ${data.status}`);
    });

    return () => {
      socket.off('orderStatusUpdated');
    };
  }, []);

  return (
    <div>
      <h2>Order Status</h2>
      {status && <p>{status}</p>}
    </div>
  );
};

export default OrderNotification;
