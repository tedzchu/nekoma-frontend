import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <Link to="/products">
        <div className="split left">
          <div className="centered">
            <h1>Products</h1>
          </div>
        </div>
      </Link>
      <Link to="/events">
        <div className="split right">
          <div className="centered">
            <h1>Events</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
