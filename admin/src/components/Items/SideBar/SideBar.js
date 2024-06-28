import React,{ useState } from 'react';
import "./SideBar.css";

const Sidebar = ({ categories, setSearchQuery, setSelectedCategory }) => {

  const [activeCategory, setActiveCategory] = useState(''); // State to track active category

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
