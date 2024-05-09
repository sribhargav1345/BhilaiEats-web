import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

export default function Shop_User(props) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const destinationLink = Cookies.get('authToken') ? (`/shop/${props.shop_id}`) : "/login";

    return (
        <Link
            to={destinationLink}
            className='text-decoration-none text-dark'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div data-testid='card-test'
                className='card mt-3 coloring shop-prop'
            >

                <img src={props.ImgSrc} className='card-img-top' alt={props.shopname} />
                <div className='card-body'>
                    <h5 className='card-title font-weight-bold text-black'>{props.shopname}</h5>
                    <p className="card-text text-success" >{props.description}</p>
                    <hr className='text-black' />
                </div>
            </div>

        </Link>
    )
}