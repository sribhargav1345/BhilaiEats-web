import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

export default function Home() {
    
    const [search, setSearch] = useState('');
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const loadData = async() => {
            try{
                const response = await fetch('https://bhilaieats-1.onrender.com/api/shopData', {
                    method: "GET",                                                                  // Get doesn't contain body, only headers
                    headers: {
                        'Content-Type': "application/json",
                    },
                });

                if(!response.ok){
                    throw new Error("Error fetching data");
                }

                const data = await response.json();
                setShops(data[0]);      
            }
            catch(err){
                console.log("Error fetching data: ", err);
            }
        };

        loadData();
    }, []);

    const handleSearchChange = (searchValue) => {
        setSearch(searchValue);
    }

    return(
        <div className="coloring">
            {/* <Navbar page={Home}/> */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h2 className="font-weight-bold mt-6 mb-6 dark-font-color">Restaurants</h2>
                    <hr className="my-2 dark-font-color" />
                    </div>
                </div>

                {shops && shops.length !==0 ? (
                    <div className="row">
                        { shops.filter((item) => item.shopname.toLowerCase().includes(search.toLowerCase())).map((filterItem) => (
                            <div key={filterItem._id} className="col-12 col-md-6 col-lg-4 mt-3">
                                {/* <Card_shop 
                                    shopname={filterItem.shopname}
                                    shop_id={filterItem._id}
                                    ImgSrc={filterItem.image}
                                    description={filterItem.description}
                                    className="card-shop"
                                /> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="Loading Page"> "Please wait... It's Loading </div>
                )}
            </div>
        </div>
    )
}