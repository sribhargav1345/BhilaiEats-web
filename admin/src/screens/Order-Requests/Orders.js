import React, { useState } from 'react';
import "./Orders.css";

import Navbar from '../../components/OrderRequests/Navbar/Navbar';
import Ordering from '../../components/OrderRequests/Orders/Orders';

export default function Orders() {

    const [orders, setOrders] = useState([]);

    return (
        <div>
            <Navbar />
            <div className='orders-page'>
                <div className='order-requests'>
                    <h4> OrderRequests </h4>
                    <hr id="line" />
                    {orders.map((order) => (
                        <Ordering key={order._id} order={order} />
                    ))}
                </div>
                <div className='requests-accepted'>
                    <h4> Accepted Requests </h4>
                </div>
            </div>
        </div>
    )
}
