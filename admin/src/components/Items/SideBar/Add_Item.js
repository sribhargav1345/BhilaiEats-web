import React, { useState } from 'react';
import './Add_item.css';

const Modal = ({ showModal, closeModal, addNewItem }) => {

    const [categoryname, setCategoryname] = useState('');
    const [veg, setVeg] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryname && name && image && price) {
            addNewItem({ categoryname, veg, name, image, quantity, price });
            closeModal();
        } else {
            alert("Please fill all required fields.");
        }
    };

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Food Item</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
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
                                <input type="checkbox" className="form-check-input" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                            </div>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Image URL:</label>
                                <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Quantity:</label>
                                <input type="text" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
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
