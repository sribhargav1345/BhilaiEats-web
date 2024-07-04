import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Home-page/Navbar/Navbar";
import Carousel from "../../components/Home-page/Carousel/Carousel";
import Footer from "../../components/Home-page/Footer/Footer";
import ShopCards from "../../components/ShopCards/ShopCards";

export default function Home() {
    const [search, setSearch] = useState('');
    const [shops, setShops] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('https://bhilaieats-web.onrender.com//api/shops', {
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
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < shops.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="coloring">
            <Navbar />
            <Carousel onSearchChange={handleSearchChange} />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="first-heading">Restaurants</h1>
                        <hr className="my-2 dark-font-color" />
                    </div>
                </div>
                <div className="shop-carousel">
                    <button onClick={handlePrevClick} disabled={currentIndex === 0} className="carousel-button">{"<"}</button>
                    <div className="shop-wrapper">
                        {shops && shops.length !== 0 ? (
                            <div className="shop-slider" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
                                {shops.filter((item) => item.shopname.toLowerCase().includes(search.toLowerCase())).map((filterItem) => (
                                    <div key={filterItem._id} className="shop-card-wrapper">
                                        <ShopCards item={filterItem} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="Loading Page">Please wait... It's Loading</div>
                        )}
                    </div>
                    <button onClick={handleNextClick} disabled={currentIndex >= shops.length - 3} className="carousel-button">{">"}</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
