import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Shop_User from "../components/Cards/User/Shop";

export default function Home() {

    const [search, setSearch] = useState('');
    const [shops, setShops] = useState([]);

    const [userType, setUserType] = useState('None');

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        if (authToken) {
            try {
                const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
                setUserType(decodedToken.user.type);
            } catch (error) {
                console.error('Error decoding authToken:', error);
            }
        }
    }, [userType]);

    let page = userType;

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/shops', {
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
    }, [search]);

    const handleSearchChange = (searchValue) => {
        setSearch(searchValue);
    }

    return (
        <div className="coloring">
            
            <Navbar page={page} />
            
            <Carousel onSearchChange={handleSearchChange} />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="font-weight-bold mt-6 mb-6 dark-font-color">Restaurants</h2>
                        <hr className="my-2 dark-font-color" />
                    </div>
                </div>
                {shops && shops.length !== 0 ? (
                    <div className="row">
                        {shops.filter((item) => item.shopname.toLowerCase().includes(search.toLowerCase())).map((filterItem) => (
                            <div key={filterItem._id} className="col-12 col-md-6 col-lg-4 mt-3">
                                <Shop_User
                                    shopname={filterItem.shopname}
                                    shop_id={filterItem._id}
                                    ImgSrc={filterItem.image}
                                    description={filterItem.description}
                                    className="card-shop"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="Loading Page">Please wait... It's Loading</div>
                )}
            </div>
            {userType === 'SuperAdmin' ? (
                <Link to="/superadmin/add_shops">
                    <div className="add-button" title="Add an Item">+</div>
                </Link>
            ) : null}
            <Footer />
        </div>
    );
}
