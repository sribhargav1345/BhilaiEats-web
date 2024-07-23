import React, { useEffect, useState } from 'react'
import "./MindPage.css";

import Navbar from '../../components/InsideShops-User/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import ShopCards from "../../components/ShopCards/ShopCards";

export default function MindPage() {

    const [shops, setShops] = useState([]);

    const { CategoryName } = useParams();
    console.log(CategoryName);

    useEffect(() => {
        const loadShops = async() => {
            const response = await fetch(`https://bhilaieats-web.onrender.com/api/categories/${CategoryName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if(!result.success || !response.ok){
                alert("Error in retrieving Shops a/c to Category");
                return;
            };

            setShops(result.data);
        };

        loadShops();

    },[CategoryName]);

    return (
        <div>
            <Navbar />
            <div className="container mindpage-header">
                <h2> Restaurants Containing {CategoryName} </h2>
                <hr/>
                <div className="shop-wrapper">
                    {shops && shops.length !== 0 ? (
                        <div className="shop-slider">
                            {shops.map((filterItem) => (
                                <div key={filterItem._id} className="shop-card-wrapper">
                                    <ShopCards item={filterItem} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="Loading Page">Please wait... It's Loading</div>
                    )}
                </div>
            </div>
        </div>
    )
}
