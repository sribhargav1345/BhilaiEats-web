import React, { useState, useEffect } from 'react';
import "./Orders.css";

export default function Ordering({ order }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(order.items);
    }, [order]);

    const handleAcception = () => {
        order.status = "accepted";

        console.log(order);

        const postAcception = async() => {
            const response = await fetch(`http://localhost:5000/api/orders/${order.orderId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(order)
            });

            const result = await response.json();

            if(!result.success || !response.ok){
                alert("Can't send Acceptance to User");
                order.status = "pending";
                return;
            }

            console.log("Order Accepted");
        }

        postAcception();
    };

    const handleRejection = () => {
        order.status = "rejected";

        const postRejection = async() => {

            const response = await fetch(`http://localhost:5000/api/orders/${order.orderId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(order)
            });

            const result = await response.json();

            if(!result.success || !response.ok){
                alert("Can't send Rejection to User");
                order.status = "pending";
                return;
            }

            console.log("Order Rejected");
        }

        postRejection();
    }

    const handleSent = () => {
        order.status = "sent";

        const postSent = async() => {

            const response = await fetch(`http://localhost:5000/api/orders/${order.orderId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(order)
            });

            const result = await response.json();

            if(!result.success || !response.ok){
                alert("Can't send Rejection to User");
                order.status = "accepted";
                return;
            }

            console.log("Order Sent");
        }

        postSent();
    }

    return (
        <div className="card order-item">
            <div className="card-body card-of-order">
                <div className="order-details">
                    {items.map((item, index) => (
                        <div key={index} className='order-item-detail'>
                            <p className="card-text"><strong>{item.qnty}x</strong> {item.name}</p>
                        </div>
                    ))}
                </div>
                <div className="order-user">
                    <p className="user-name2">{order.user.name}</p>
                    <p className="user-name2">{order.user.email}</p>
                    <p className="user-name2">{order.user.contact}</p>
                </div>
            </div>
            <div className='buttons-of-price'>
                <div>
                    <p style={{margin: '1vh 0' }}> <strong> <span style={{ color: 'rgb(120, 77, 198)'}}> Price: </span> {order.price} </strong> </p>
                </div>
                { order.status === 'pending' ? (
                    <div className='buttons-of-accept'>
                        <button className='btn btn-sm btn-danger acception' onClick={handleRejection} > Reject </button>
                        <button className='btn btn-sm btn-success acception' onClick={handleAcception} > Accept </button>
                    </div>
                ) : ( order.status === 'accepted' ? (
                    <div className='buttons-of-accept'>
                        <button className='btn btn-sm btn-danger acception' onClick={handleRejection} > Reject </button>
                        <button className='btn btn-sm btn-success acception' onClick={handleSent} > Sent </button>
                    </div>
                ) : (null))}
            </div>
        </div>
    );
}
