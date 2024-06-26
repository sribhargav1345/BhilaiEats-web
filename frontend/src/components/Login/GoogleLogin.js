import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    if (response.credential) {
      const decoded = jwtDecode(response.credential);
      console.log('User Email:', decoded.email);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;