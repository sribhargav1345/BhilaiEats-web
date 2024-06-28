import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginAdmin from './screens/Login/Login-Admin';
import SignUpAdmin from './screens/SignUp/SignUp-Admin';
import InsideShops from './screens/Items/Items';

function Routing() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<InsideShops />} />
          <Route exact path="/login" element={<LoginAdmin />} />
          <Route exact path="/register" element={<SignUpAdmin />} />
        </Routes>
      </Router>
  );
}

export default Routing;
