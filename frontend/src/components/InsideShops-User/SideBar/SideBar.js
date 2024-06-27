import React from 'react';
import "./SideBar.css";

const Sidebar = ({ categories, setSearchQuery }) => {
  return (
    <div className="full-sidebar">
      <div className="container">
        <input
          type="text"
          placeholder="Search menu items..."
          className="search-bar-insideshop"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.categoryname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
