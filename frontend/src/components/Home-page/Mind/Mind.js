import React, { useState, useEffect, useRef } from 'react';
import "./Mind.css";

import CategoryCard from './CategoryCard';
import { Link } from "react-router-dom";

export default function Mind() {
  
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories', {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Error fetching data");
        }

        setCategories(result.data);
      } catch (err) {
        console.log("Error fetching data in Homejs: ", err);
      }
    };

    loadData();
  }, [search]);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < Math.ceil(categories.length / 3) - 1) { // Adjust 3 to the number of items per view
      setCurrentIndex(currentIndex + 1);
    }
  };

  const destinationLink = (item) => {
    return (`/category-search/${item.categoryname}`);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstChild.clientWidth;
      sliderRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="second-heading" style={{ fontWeight: "550"}}>What's in your Mind</h2>
          <hr className="my-2 dark-font-color" />
        </div>
      </div>
      <div className="shop-carousel">
        <button onClick={handlePrevClick} disabled={currentIndex === 0} className="carousel-button">{"<"}</button>
        <div className="category-wrapper">
          {categories && categories.length !== 0 ? (
            <div className="category-slider" ref={sliderRef}>
              {categories.filter((item) => item.shop.toLowerCase().includes(search.toLowerCase())).map((filterItem) => (
                <Link key={filterItem._id} to={destinationLink(filterItem)} className="category-card-wrapper" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <CategoryCard item={filterItem} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="Loading Page">Please wait... It's Loading</div>
          )}
        </div>
        <button onClick={handleNextClick} disabled={currentIndex >= Math.ceil(categories.length / 3) - 1} className="carousel-button">{">"}</button>
      </div>
    </div>
  )
}
