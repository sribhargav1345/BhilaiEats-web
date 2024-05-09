import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './components/User/ContextReducer';

import Home from './screens/Home';
// import UserProfile from './screens/User/UserProfile';
import Login from './screens/Login';
// import SignUp from './screens/Common_In_All/Signup';
// import Contact from './screens/Common_In_All/Contact';
// import DynamicUserShops from './screens/User/DynamicUserShops';
// import DynamicOwner from './screens/Owner_data/DynamicOwner';
// import Add_Shops from './screens/Super_Admin/Add_shop';
// import Add_item from './screens/Owner_data/Add_item';
// import Home_SuperAdmin from './screens/Super_Admin/Home_SuperAdmin';

function Routing() {
  return (
    // <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/myOrders" element={<MyOrders />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user" element={<Home />} />
          <Route exact path="/superadmin" element={<Home_SuperAdmin />} />
          <Route exact path="/shop/:shop_id" element={<DynamicUserShops />} />
          <Route exact path="/owner/:owner_id" element={<DynamicOwner />} />
          <Route exact path="/superadmin/add_shops" element={<Add_Shops />} />
          <Route exact path="/owner/:owner_id/add_item" element={<Add_item />} /> */}
        </Routes>
      </Router>
    // </CartProvider>
  );
}

export default Routing;
