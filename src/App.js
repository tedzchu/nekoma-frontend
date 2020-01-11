import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Users from './views/Users'
import Products from './views/products/Products'
import Product from './views/products/Product'
import Events from './views/events/Events'
import Sales from './views/sales/Sales'

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:id" component={Product} />
      <Route exact path="/events" component={Events} />
      <Route path="/events/:id" component={Sales} />
    </Switch>
  )
}

export default App