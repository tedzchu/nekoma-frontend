import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <Link to="/products">
        <div class="split left">
          <div class="centered">
            <h1>Products</h1>
          </div>
        </div>
      </Link>
      <Link to="/events">
        <div class="split right">
          <div class="centered">
            <h1>Events</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
