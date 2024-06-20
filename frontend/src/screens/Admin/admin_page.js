import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './admin_page.css';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Food_Admin from '../../components/Cards/Admin/Food';

export default function Admin() {
    const { owner_id } = useParams();

    const [foodItems, setFoodItems] = useState([]);
    const [foodItemCat, setFoodItemCat] = useState([]);

    const fetchFoodItems = async () => {

        try {
            const response = await fetch(`http://localhost:5000/api/owner/${owner_id}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Food Items");
            }

            const data = await response.json();

            setFoodItems(data[0]);  // Data[0] contains food Items data here
            setFoodItemCat(data[1]);
        }
        catch (error) {
            console.log("Error fetching Owner data: ", error);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, [owner_id]);

    const handleRemoveItem = async (cardId) => {

        try {
            const confirmed = window.confirm("Are you sure you want to remove this item?");

            if (confirmed) {
                const response = await fetch(`http://localhost:5000/api/cards/${cardId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    fetchFoodItems();
                    alert("Item removed Successfully");
                }
                else {
                    alert("Failed to Remove Card");
                }
            }
        }
        catch (error) {
            console.log("Error removing card: ", error);
        }
    }

    return (
        <div className='full-width-background'>
            <Navbar page={Admin}/>

            <div className='container'>
                {foodItemCat && foodItemCat.length !== 0 ? (
                    foodItemCat.map((category) => (
                        <div key={category._id} className='row md-3'>
                            <div className='fs-3 m-3'>{category.categoryname}</div>
                            <hr />
                            {foodItems && foodItems.length !== 0 ? (
                                foodItems.filter((item) => item.categoryname === category.categoryname).map((filterItem) => (
                                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-4 mt-3'>
                                        <div style={{ marginRight: '1rem' }}>
                                            <Food_Admin cardId={filterItem._id} foodName={filterItem.name} ImgSrc={filterItem.image} options={filterItem.options} handleRemoveItem={handleRemoveItem} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-black'>No such data found</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className='loading'>
                        Loading.. Please Wait
                    </div>
                )}
            </div>
            <Link to={`/owner/${owner_id}/add_item`}>
                <div className="add-button" title="Add an Item">
                    +
                </div>
            </Link>
            <Footer />
        </div>
    );
}
