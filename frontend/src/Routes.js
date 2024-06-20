import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/User/ContextReducer';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import InsideShop from "./screens/User/InsideShop";
import Add_shop from "./screens/SuperAdmin/Add_shop";
import Admin_page from "./screens/Admin/admin_page";
import Add_item from "./screens/Admin/Add_item";

function Routing() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/user" element={<Home />} />
          <Route exact path="/superadmin" element={<Home />} />
          <Route exact path="/shop/:shop_id" element={<InsideShop />} />
          <Route exact path="/owner/:owner_id" element={<Admin_page />} />
          <Route exact path="/superadmin/add_shops" element={<Add_shop />} />
          <Route exact path="/owner/:owner_id/add_item" element={<Add_item />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default Routing;
