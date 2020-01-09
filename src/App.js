import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Users from './views/Users'
import Products from './views/products/Products'
import Product from './views/products/Product'
import Events from './views/events/Events'
import Event from './views/events/Event'

const App = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={Product} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id" component={Event} />
    </Switch>
  )
}

export default App