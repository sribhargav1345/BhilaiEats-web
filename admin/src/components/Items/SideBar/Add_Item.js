import React, { useState } from 'react';
import './Add_item.css';
import { getUserFromToken } from '../../../utils';

const Modal = ({ showModal, closeModal, addNewItem }) => {

    const token = getUserFromToken();

    const [categoryname, setCategoryname] = useState('');

    const [veg, setVeg] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async() => {

        const response = await fetch("https://bhilaieats-web.onrender.com/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shopname: token.shopname,
                categoryname: categoryname,
                name: name,
                image: image,
                quantity: quantity,
                price: price,
                veg: veg
            })
        });  

        const result = response.json();

        if(!result.success){
            alert("Failed to Add Item");
        }

        closeModal();
    };

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Food Item</h5>
                        <button type="button" className="btn btn-md close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Category Name:</label>
                                <input type="text" className="form-control" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Vegetarian:</label>
                                <div className='boxes'>
                                    <div className="form-check mx-5">
                                        <input type="checkbox" className="form-check-input" id="vegYes" name="veg" value="yes" checked={veg === 'yes'} onChange={(e) => setVeg(e.target.value)} />
                                        <label className="form-check-label" htmlFor="vegYes">Yes</label>
                                    </div>
                                    <div className="form-check me-5">
                                        <input type="checkbox" className="form-check-input" id="vegNo" name="veg" value="no" checked={veg === 'no'} onChange={(e) => setVeg(e.target.value)} />
                                        <label className="form-check-label" htmlFor="vegNo">No</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Image URL:</label>
                                <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                            </div>
                            <div className='d-flex'>
                                <div className="form-group me-4">
                                    <label>Price:</label>
                                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Quantity:</label>
                                    <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Item</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
