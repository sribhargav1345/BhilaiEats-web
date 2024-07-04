import React, { useEffect, useState } from 'react';
import "./Items.css";

import Fuse from "fuse.js";

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

import Navbar from "../../components/Items/Navbar/Navbar";
import CardShop from '../../components/Items/CardShop/CardShop';
import Sidebar from '../../components/Items/SideBar/SideBar';
import MenuItem from '../../components/Items/Menu/Menu';
import { useNavigate } from 'react-router-dom';

export default function Items() {

    const [foods, setFoods] = useState([]);
    const [shop, setShop] = useState({});

    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');
    const [authorized, setAuthorized] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const loadItems = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    setAuthorized(false);
                    navigate('/login'); 
                    return;
                }

                const decoded = jwtDecode(token);
                const shopname = decoded.user.shopname;

                if (!shopname) {
                    setAuthorized(false);
                    navigate('/login'); 
                    return;
                }

                setAuthorized(true);

                const response = await fetch(`https://bhilaieats-web.onrender.com/api/shops/${shopname}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await response.json();
                console.log(result);

                if (!result.success) {
                    alert(result.message || "Error in Getting Items");
                    return;
                }

                setShop(result.shop);
                setFoods(result.items);
                setCategories(result.categories);
            } 
            catch (error) {
                console.log(error);
            }
        };

        loadItems();
    }, [navigate]); 

    const addNewItem = async (newItem) => {
        try {
            const response = await fetch(`https://bhilaieats-web.onrender.com/api/add`, {
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
            const response = await fetch(`https://bhilaieats-web.onrender.com/api/Item/${item_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
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
        authorized ? (
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
        ) : <div>
            <h2 className='text-center font-bold'>401 - UnAuthorized </h2> 
        </div>
    );
}
