import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginAdmin from './screens/Login/Login-Admin';
import SignUpAdmin from './screens/SignUp/SignUp-Admin';
import Items from './screens/Items/Items';
import Orders from './screens/Order-Requests/Orders';

function Routing() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Items />} />
          <Route exact path="/login" element={<LoginAdmin />} />
          <Route exact path="/register" element={<SignUpAdmin />} />
          <Route exact path="/order-requests" element={<Orders /> } />
        </Routes>
      </Router>
  );
}

export default Routing;
