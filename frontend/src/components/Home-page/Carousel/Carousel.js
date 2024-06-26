import React, { useState } from "react";
import burg from "../../../Assests/choice1.jpg";

import "./Carousel.css";  

export default function Carousel({ onSearchChange }) {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        onSearchChange(searchTerm);
    };

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src={burg}
                        className="d-block w-100 carousel-image"
                        alt="Carousel"
                    />
                    <div className="carousels-caption">
                        <div className="text-carousel">
                            <p>Food Delivery at IIT Bhilai</p>
                        </div>
                        <div className='search-container'>
                            <input
                                className="form-control form-search-restaurant me-2"
                                type="search"
                                placeholder="Search Restaurants..."
                                aria-label="Search"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button type="submit" className="btn btn-md search-button"> Search </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
