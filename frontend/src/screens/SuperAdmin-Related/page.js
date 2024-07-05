import React, { useEffect, useState } from 'react';
import './page.css';

import Navbar from "../../components/SuperAdmin/Navbar";
import ShopCard from "../../components/SuperAdmin/ShopCard";

export default function SuperAdmin() {

    const [shops, setShops] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('https://bhilaieats-web.onrender.com/api/shops', {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error fetching data");
                }

                const result = await response.json();
                setShops(result.data);
            } catch (err) {
                console.log("Error fetching data in Homejs: ", err);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div className='shop-super'>
                    <h3> Shops Available: </h3>
                    <hr />
                </div>
                {shops && shops.length !== 0 ? (
                    <div className="shop-slideri">
                        {shops.map((item) => (
                            <div key={item._id} className="shop-card-wrappery">
                                <ShopCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="Loading Page">Please wait... It's Loading</div>
                )}
            </div>
        </div>
    )
}

