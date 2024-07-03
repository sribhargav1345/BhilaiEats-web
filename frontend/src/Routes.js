import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import InsideShops from './screens/InsideShops/InsideShops';
import Checkout from './screens/Checkout/Checkout';

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
        </Routes>
      </Router>
    </Provider>
  );
}

export default Routing;
