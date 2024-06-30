import React, { useEffect, useState } from 'react';
import "./Items.css";
import Fuse from "fuse.js";
import { useParams } from 'react-router-dom';

import Navbar from "../../components/Items/Navbar/Navbar";
import CardShop from '../../components/Items/CardShop/CardShop';
import Sidebar from '../../components/Items/SideBar/SideBar';
import MenuItem from '../../components/Items/Menu/Menu';

export default function Items() {

    const [foods, setFoods] = useState([]);
    const [shop, setShop] = useState({});

    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const { shop_id } = useParams();

    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/shops/${shop_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (!result.success) {
                    alert(result.message || "Error in Getting Items");
                }

                setShop(result.shop);
                setFoods(result.items);
                setCategories(result.categories);
            } catch (error) {
                console.log(error);
            }
        };

        loadItems();
    }, [shop_id]);


    const addNewItem = async (newItem) => {
        try {
            const response = await fetch(`http://localhost:5000/api/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            });

            const result = await response.json();
            if (!result.success) {
                alert(result.message || "Error in Adding Item");
                return;
            }

            setFoods([...foods, result.item]);
        } 
        catch (error) {
            console.error('Error adding new item:', error);
        }
    };

    const handleRemoveItem = async (item_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/Item/${item_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();
            if (!result.success) {
                alert(result.message || "Something went wrong in Deletion");
                return;
            }

            setFoods(foods.filter(item => item._id !== item_id));
        } 
        catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const fuse = new Fuse(foods, {
        keys: ['name'],
        threshold: 0.5
    });

    const filteredItems = foods.filter(item => {
        const matchesSearchQuery = searchQuery ? fuse.search(searchQuery).map(result => result.item).includes(item) : true;
        const matchesCategory = selectedCategory ? item.categoryname === selectedCategory : true;
        return matchesSearchQuery && matchesCategory;
    });

    return (
        <div>
            <Navbar />
            <div className='container total-down'>
                <CardShop shop={shop} />
                <div className='total-part'>
                    <div className='side-bar'>
                        <Sidebar 
                            categories={categories} 
                            setSearchQuery={setSearchQuery} 
                            setSelectedCategory={setSelectedCategory} 
                            addNewItem={addNewItem}  
                        />
                    </div>
                    <hr className='separation' />
                    <div className='foods-display ms-4'>
                        {filteredItems.map(item => (
                            <MenuItem 
                                key={item._id} 
                                item={item} 
                                handleRemoveItem={() => handleRemoveItem(item._id)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
