import React, { useState } from 'react';
import './Add_shop.css';

import { TokenOnly } from '../../utils';

export default function AddShop() {

    const [showPopup, setShowPopup] = useState(false);

    const [shopname, setShopname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const token = TokenOnly();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("https://bhilaieats-web.onrender.com/api/shops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                shopname,
                name,
                email,
                contact,
                image,
                description
            })
        });

        const result = await response.json();
        console.log(result);

        if (!result.success) {
            alert("Failed to Add Shop");
        } else {
            alert("Item Added Successfully");
        }

        setShopname('');
        setName('');
        setImage('');
        setDescription('');
        setEmail('');
        setContact('');

        setShowPopup(false);
    };

    return (
        <div className='add-item'>
            <button className='btn btn-primary btn-md addingshopbutton' onClick={togglePopup}>Add Shop</button>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-inner'>
                        <h2 className='align-center pop-title'>Add Shop</h2>
                        <form onSubmit={handleSubmit}>
                            <label className='m-2'>
                                Shop Name:
                                <input type='text' className='form-control' required value={shopname} onChange={(e) => setShopname(e.target.value)} />
                            </label>
                            <label>
                                Name:
                                <input type='text' className='form-control' required value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                            <div className='d-flex'>
                                <label>
                                    Email:
                                    <input type='text' className='form-control' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                <label className='ms-4'>
                                    Contact:
                                    <input type='number' className='form-control' required value={contact} onChange={(e) => setContact(e.target.value)} />
                                </label>
                            </div>
                            <label>
                                Image URL:
                                <input type='text' className='form-control' required value={image} onChange={(e) => setImage(e.target.value)} />
                            </label>
                            <label>
                                Description:
                                <input type='text' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </label>
                            <button type='submit' className='btn btn-primary changesome'>Submit</button>
                            <button type='button' className='btn btn-secondary changesome' onClick={togglePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
