import React, { useState } from 'react';
import './ShopCard.css';

import Cookies from "js-cookie";

import { Link } from 'react-router-dom';

export default function ShopCard(props) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    let item = props.item;
    const destinationLink = `/shop/${item._id}`;

    const handleRemoveShop = async(e) => {

        e.preventDefault(); 

        const response = await fetch(`https://bhilaieats-web.onrender.com/api/removeshop/${item._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('authToken')}`
            }
        });

        let result = await response.json();

        if(!result.success){
            alert(result.message || "Failed to Remove Shop");
            return;
        }

        alert("Shop Removed Successfully");
    };

    return (
        <Link
            to={destinationLink}
            className="link-shop-user"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card mt-3 card-shop"
                style={{
                    boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                <div className='complete-shop'>
                    <img src={item.image} className="shop-image" alt="Shop" />
                    <div className="card-body card-body-style">
                        <h4 className="card-title title-style">{item.shopname}</h4>
                        <p className="card-text text-style">{item.description}</p>
                        <button className='btn btn-danger buttontoshop' onClick={handleRemoveShop}> Remove </button>
                        <hr />
                    </div>
                </div>
            </div>
        </Link>
    );
}