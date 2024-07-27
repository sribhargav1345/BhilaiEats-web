import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import InsideShops from './screens/InsideShops/InsideShops';
import Checkout from './screens/Checkout/Checkout';
import SuperAdmin from './screens/SuperAdmin-Related/page';
import MindPage from './screens/MindPage/MindPage';

function Routing() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/user" element={<Home />} />
          <Route exact path="/shop/:shop_id" element={<InsideShops />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/superadmin" element={<SuperAdmin />} />
          <Route exact path="/category-search/:CategoryName" element={<MindPage/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default Routing;
