import React, { useState, useEffect } from 'react';
import './Edit_item.css';

import { getUserFromToken, TokenOnly } from '../../../utils';

export default function EditItem({ item, handlePopupClose }) {

    const [showPopup, setShowPopup] = useState(true);

    const [categoryname, setCategoryname] = useState('');
    const [veg, setVeg] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const token = TokenOnly();
    const decoded = getUserFromToken();

    useEffect(() => {
        if (item) {
            setCategoryname(item.categoryname);
            setVeg(item.veg);
            setName(item.name);
            setImage(item.image);
            setQuantity(item.quantity);
            setPrice(item.price);
        }
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
        handlePopupClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `https://bhilaieats-web.onrender.com/api/edit/${item._id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                shop: decoded.shopname,
                categoryname,
                name,
                image,
                quantity,
                price,
                veg
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert("Failed to update item");
        } else {
            alert("Item updated successfully");
        }

        setShowPopup(false);
    };

    return (
        <div className='edit-item'>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center pop-title'>Edit Food Item</h2>
                        <form onSubmit={handleSubmit}>
                            <label className='m-2'>
                                Category Name:
                                <input type='text' className='form-control' required value={categoryname} onChange={(e) => setCategoryname(e.target.value)} />
                            </label>
                            <label>
                                Vegetarian:
                                <div className='d-flex'>
                                    <div className="form-check me-4">
                                        <input type="radio" className="form-check-input" id="vegYes" name="veg" value={true} checked={veg === true} onChange={() => setVeg(true)} />
                                        <label className="form-check-label" htmlFor="vegYes">Yes</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="vegNo" name="veg" value={false} checked={veg === false} onChange={() => setVeg(false)} />
                                        <label className="form-check-label" htmlFor="vegNo">No</label>
                                    </div>
                                </div>
                            </label>
                            <label>
                                Name:
                                <input type='text' className='form-control' required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                Image URL:
                                <input type='text' className='form-control' required value={image} onChange={(e) => setImage(e.target.value)} />
                            </label>
                            <div className='d-flex'>
                                <label className='me-4'>
                                    Price:
                                    <input type='number' className='form-control' required value={price} onChange={(e) => setPrice(e.target.value)} />
                                </label>
                                <label>
                                    Quantity:
                                    <input type='text' className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </label>
                            </div>
                            <button type='submit' className='btn btn-primary me-2'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={togglePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
