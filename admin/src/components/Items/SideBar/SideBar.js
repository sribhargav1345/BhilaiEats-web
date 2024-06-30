import React, { useState } from 'react';
import Modal from './Add_Item';
import "./SideBar.css";

const Sidebar = ({ categories, setSearchQuery, setSelectedCategory, addNewItem }) => {

  const [activeCategory, setActiveCategory] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
          <button type='button' className='btn btn-success buttonto-add' onClick={openModal}> Add </button>
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
      <Modal showModal={showModal} closeModal={closeModal} addNewItem={addNewItem} />
    </div>
  );
};

export default Sidebar;
