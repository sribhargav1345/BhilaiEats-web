import React from 'react';

import './CardShop.css';

const CardShop = ({ shop }) => {

    return (
        <div className="carding2">
            <div className='imageuu2'>
                <img src={shop.image} alt={shop.shopname} />
            </div>
            <div className='right-part'>
                <h1 className='naming fs-3 fst-italic'>{shop.shopname}</h1>
                <div className='starting'>
                    <div className='short'>
                        <p className='descri'>{shop.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardShop;
