import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container">
      <div className="split left" onClick={() => loginWithRedirect({})}>
        <div className="centered">
          <h1>Log In</h1>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <h1>Sign Up</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
