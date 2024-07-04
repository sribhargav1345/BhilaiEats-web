import React, { useState } from 'react';
import './Add_item.css';
import { getUserFromToken, TokenOnly } from '../../../utils';

export default function AddItem() {

    const [showPopup, setShowPopup] = useState(false);

    const [categoryname, setCategoryname] = useState('');
    const [veg, setVeg] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState('');

    const decoded = getUserFromToken();
    const token = TokenOnly();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("https://bhilaieats-web.onrender.com/api/add", {
            method: "POST",
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

        console.log(quantity);

        const result = await response.json();
        console.log(result);

        if (!result.success) {
            alert("Failed to Add Item");
        } else {
            alert("Item Added Successfully");
        }

        setCategoryname('');
        setVeg('');
        setName('');
        setImage('');
        setQuantity('');
        setPrice('');

        setShowPopup(false);
    };

    return (
        <div className='add-item'>
            <button className='btn btn-primary btn-md ms-3' onClick={togglePopup}>Add Item</button>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center pop-title'>Add a Food Item</h2>
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
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <button type='button' className='btn btn-secondary' onClick={togglePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
