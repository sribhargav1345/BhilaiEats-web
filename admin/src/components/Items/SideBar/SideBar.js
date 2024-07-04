import React, { useState } from 'react';
import AddItem from './Add_Item'; // Adjust the import path as needed
import "./SideBar.css";

const Sidebar = ({ categories, setSearchQuery, setSelectedCategory }) => {
    const [activeCategory, setActiveCategory] = useState('');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSelectedCategory(category);
    };

    return (
        <div className="full-sidebar">
            <div className="container">
                <div className='searching-here'>
                    <h5> Search here: </h5>
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        className="search-bar-insideshop"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='adding-items-here'>
                    <h5> Add Items: </h5>
                    <AddItem />
                </div>
                <div className='filter-categories'>
                    <h5> Filter By Categories: </h5>
                    <div>
                        <ul>
                            <li onClick={() => handleCategoryClick('')} className='category-special'>All</li>
                            {categories.map((category, index) => (
                                <li key={index} onClick={() => handleCategoryClick(category.categoryname)} className={activeCategory === category.categoryname ? 'active category-special' : 'category-special'}>{category.categoryname}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
