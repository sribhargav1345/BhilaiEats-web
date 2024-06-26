import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./InsideShops.css";

import Navbar from "../../components/Home-page/Navbar/Navbar";
import FoodCard from "../../components/InsideShops-User/FoodCard";

export default function InsideShops() {

    const { shop_id } = useParams();
    const [items, setItems] = useState([]);
    const [shop, setShop] = useState({});

    useEffect(() => {

        const loadItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/shop/${shop_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();

                if (!result.success) {
                    alert(result.message || "Error in Getting Items");
                }
                
                setShop(result.shop);
                setItems(result.items);
            }
            catch (error) {
                console.log(error);
            }
        }

        loadItems();

    }, [shop_id]);

    return (

        <div>
            {/* <Navbar page={None}/> */}
            <div className='container'>
                <div>
                    <h2>{shop.shopname}</h2>
                </div>
                <div className='total-part'>
                    <div className='side-bar'>
                        Hi
                    </div>
                    <div className='foods-display'>
                        {items.map(item => (
                            <FoodCard key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
