import React from 'react'
import { browserHistory } from 'react-router'

import { Router, Route } from 'react-router'

import WelcomePage from './components/Welcome'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={ WelcomePage} >
    </Route>
  </Router>
)
