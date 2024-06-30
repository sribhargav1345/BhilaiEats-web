import React, { useEffect, useState } from 'react';
import "./Items.css";

// import Cookies from "js-cookie";
// import { jwtDecode } from 'jwt-decode';
import Fuse from "fuse.js";

import Navbar from "../../components/Items/Navbar/Navbar";
import CardShop from '../../components/Items/CardShop/CardShop';
import Sidebar from '../../components/Items/SideBar/SideBar';
import MenuItem from '../../components/Items/Menu/Menu';
// import { useNavigate } from 'react-router-dom';

export default function InsideShops() {

    const [items, setItems] = useState([]);
    const [shop, setShop] = useState({});
    const [categories, setCategories] = useState([]);

    // const [shopname, setShopname] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // let navigate = useNavigate();

    // useEffect(() => {
    //     const checkAuthToken = async() => {

    //         await new Promise(resolve => setTimeout(resolve, 1000));

    //         const token = Cookies.get('authToken');
            
    //         console.log(token);
    //         if (!token) {
    //             navigate("/login");
    //             return;
    //         }

    //         try {
    //             const decodedToken = jwtDecode(token);
    //             console.log('Decoded Token:', decodedToken);
    //             const currentTime = Date.now() / 1000;

    //             const shopname = decodedToken.user?.shopname;
    //             if (!shopname) {
    //                 Cookies.remove('authToken');
    //                 alert("Invalid Token");
    //                 navigate("/login");
    //                 return;
    //             }

    //             if (decodedToken.exp <= currentTime) {
    //                 Cookies.remove('authToken');
    //                 console.log("Token Expired");
    //                 navigate("/login");
    //                 return;
    //             }

    //             setShopname(shopname);
    //         } catch (error) {
    //             console.error('Error decoding token:', error);
    //             Cookies.remove('authToken');
    //             navigate("/login");
    //         }
    //     };

    //     checkAuthToken();
    // }, [navigate]);
    let shopname = "At Mart";

    useEffect(() => {

        const loadItems = async () => {
            try {
                const response = await fetch(`https://bhilaieats-web.onrender.com/api/shops/${shopname}`, {
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
            } catch (error) {
                console.log(error);
            }
        }

        loadItems();

    }, [shopname]);

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
                <CardShop shop={shop} />
                <div className='total-part'>
                    <div className='side-bar'>
                        <Sidebar categories={categories} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
                    </div>
                    <hr className='separation' />
                    <div className='foods-display ms-4'>
                        {filteredItems.map(item => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
