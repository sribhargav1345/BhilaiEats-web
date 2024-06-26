import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import LoginAdmin from './screens/Admin-Related/Login/Login-Admin';
import Signup from './screens/Signup/Signup';
import SignUpAdmin from './screens/Admin-Related/Signup/SignUp-Admin';
import InsideShops from './screens/InsideShops/InsideShops';

function Routing() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/login-Admin" element={<LoginAdmin />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/register-Admin" element={<SignUpAdmin />} />
          <Route exact path="/user" element={<Home />} />
          <Route exact path="/shop/:shop_id" element={<InsideShops />} />
        </Routes>
      </Router>
  );
}

export default Routing;
