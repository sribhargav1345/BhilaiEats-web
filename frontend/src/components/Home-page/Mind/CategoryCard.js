import React from 'react';
import "./CategoryCard.css";

export default function CategoryCard({ item }) {
  return (
    <div className="category-card">
      <div className="category-image-wrapper">
        <img src={item.image} alt={item.shop} className="category-image" />
      </div>
      <div className="category-name5">{item.categoryname}</div>
    </div>
  );
}
