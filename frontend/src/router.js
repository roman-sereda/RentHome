import React from 'react'

import { Router, Route } from 'react-router'

import someComponent from './somePath'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={someComponent} >
      <Route path="somePath" component={someComponent} />
    </Route>
  </Router>
)
