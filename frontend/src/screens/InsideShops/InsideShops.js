import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./InsideShops.css";

import Fuse from "fuse.js";

import Navbar from "../../components/InsideShops-User/Navbar/Navbar";
import CardShop from '../../components/InsideShops-User/CardShop/CardShop';
import Sidebar from '../../components/InsideShops-User/SideBar/SideBar';
import MenuItem from '../../components/InsideShops-User/Menu/Menu';

export default function InsideShops() {

    const { shop_id } = useParams();
    const [items, setItems] = useState([]);
    const [shop, setShop] = useState({});
    const [categories, setCategories] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {

        const loadItems = async () => {
            try {
                const response = await fetch(`https://bhilaieats-web.onrender.com//api/shop/${shop_id}`, {
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

                setItems(result.items);
                setCategories(result.categories);
            }
            catch (error) {
                console.log(error);
            }
        }

        loadItems();

    }, [shop_id]);

    const fuse = new Fuse(items, {
        keys: ['name'],
        threshold: 0.5
    });

    const filteredItems = items.filter(item => {
        const matchesSearchQuery = searchQuery ? fuse.search(searchQuery).map(result => result.item).includes(item) : true;
        const matchesCategory = selectedCategory ? item.categoryname === selectedCategory : true;
        return matchesSearchQuery && matchesCategory;
    });

    return (

        <div>
            <Navbar />
            <div className='container total-down'>
                <CardShop shop={shop}/>
                <div className='total-part'>
                    <div className='side-bar'>
                        <Sidebar categories={categories} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory}/>
                    </div>
                    <hr className='separation' />
                    <div className='foods-display ms-4'>
                        {filteredItems.map(item => (
                            <MenuItem key={item._id} item={item} shop={shop}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
