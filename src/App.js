import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import Home from "./views/Home";
import Login from "./views/Login";
import Users from "./views/Users";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./views/products/Products";
import Product from "./views/products/Product";
import Events from "./views/events/Events";
import Sales from "./views/sales/Sales";

const App = () => {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Switch>
      {!isAuthenticated && <Route exact path="/" component={Login} />}
      {isAuthenticated && <Route exact path="/" component={Home} />}
      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute exact path="/products" component={Products} />
      <PrivateRoute path="/products/:id" component={Product} />
      <PrivateRoute exact path="/events" component={Events} />
      <PrivateRoute path="/events/:id" component={Sales} />
    </Switch>
  );
};

export default App;
