import React, { useState } from "react";

export default function Carousel({ onSearchChange }) {

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {

        const searchTerm = e.target.value;
        setSearch(searchTerm);
        onSearchChange(searchTerm);
    };

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner" id="carousel">
                <div className="carousel-caption">
                    <div className="textcarousel">
                        <p>Food Delivery at IIT Bhilai</p>
                    </div>
                    <div className='search-container'>
                        <input
                            className="form-control me-2 bg-white text-dark"
                            type="search"
                            placeholder="Search Restaurants..."
                            aria-label="Search"
                            value={search}
                            onChange={handleSearch}
                        />

                        <button className="btn btn-orange" type="button" style={{ backgroundColor: 'orange', color: "black" }}>
                            Search
                        </button>

                    </div>
                </div>

                <div className="carousel-item active">
                    <img
                        src="https://lyphe.com/app/uploads/2023/10/Image-1-cannabis-muffins.jpeg"
                        className="d-block w-10"
                        alt="Carousel Picture"
                    />
                </div>
            </div>
        </div>
    )
}