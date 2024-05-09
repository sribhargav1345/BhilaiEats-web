import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Admin() {
    const { owner_id } = useParams();

    const [ foodItems, setFoodItems ] = useState([]);
    const [ foodItemCat, setFoodItemCat ] = useState([]);

    const fetchFoodItems = async() => {

        try{
            const response = await fetch(`https://bhilaieats-1.onrender.com/api/owner/${owner_id}` , {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!response.success){
                throw new Error("Failed to fetch Food Items");
            }

            const data = await response.json();

            setFoodItems(data[0]);  // Data[0] contains food Items data here
            setFoodItemCat(data[1]);
        }
        catch(error){
            console.log("Error fetching Owner data: ", error);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, [owner_id]);

    const handleRemoveItem = async(cardId) => {

        try{
            const confirmed = window.confirm("Are you sure you want to remove this item?");

            if(confirmed){
                const response = await fetch()
            }
        }
    }
}