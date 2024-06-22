import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';

function Routing() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/user" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default Routing;
