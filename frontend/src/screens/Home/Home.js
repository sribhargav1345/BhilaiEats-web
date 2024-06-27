import React, { useEffect, useState } from "react";
import "./Home.css";

import Navbar from "../../components/Home-page/Navbar/Navbar";
import Carousel from "../../components/Home-page/Carousel/Carousel";
import Footer from "../../components/Home-page/Footer/Footer";
// import Mind from "../../components/Home-page/Mind/Mind";
import ShopCards from "../../components/ShopCards/ShopCards";

export default function Home() {

    const [search, setSearch] = useState('');
    const [shops, setShops] = useState([]);

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
            
            <Navbar />
            
            <Carousel onSearchChange={handleSearchChange} />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="first-heading"> Restaurants </h1>
                        <hr className="my-2 dark-font-color" />
                    </div>
                </div>
                {shops && shops.length !== 0 ? (
                    <div className="row">
                        {shops.filter((item) => item.shopname.toLowerCase().includes(search.toLowerCase())).map((filterItem) => (
                            <div key={filterItem._id} className="col-10 col-md-6 col-lg-4 mt-3">
                                <ShopCards
                                    item={filterItem}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="Loading Page">Please wait... It's Loading</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
