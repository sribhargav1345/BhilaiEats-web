import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Food_User from "../../components/Cards/User/Food";

export default function InsideShop() {
    
    const { shop_id } = useParams();

    const [foodItems, setFoodItems] = useState([]);
    const [foodItemCat, setFoodItemCat] = useState([]);

    useEffect(() => {
        
        const fetchFoodItems = async() => {

            try{
                const response = await fetch(`http://localhost:5000/api/shop/${shop_id}`);
                
                const data = await response.json();

                setFoodItems(data[0]);
                setFoodItemCat(data[1]);
            }
            catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };
        fetchFoodItems();
    }, [shop_id]);

    return (
        <div className="full-width-background">

            <Navbar page={props.Home}/>

            <div className='container'>

                {foodItemCat && foodItemCat.length !== 0 ? (
                    foodItemCat.map((category) => (

                        <div key={category._id} className='row mb-3'>

                            <div className="fs-3 m-3">{category.categoryname}</div>
                            <hr />

                            {foodItems.length !== 0 ? (
                                foodItems.filter((item) => item.categoryname === category.categoryname && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filterItem) => (

                                    <div key={filterItem._id} className='col'>
                                        <Food_User foodName={filterItem.name} ImgSrc={filterItem.image} options={filterItem.options} />
                                    </div>

                                ))
                            ) : (
                                <div className='text-black'>No such data found</div>
                            )}

                        </div>
                    ))
                ) : (
                    <div> Please wait... It's Loading</div>
                )}
            </div>
            <Footer />
        </div>
    )
}