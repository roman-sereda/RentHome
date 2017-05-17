import React from 'react'
import { browserHistory } from 'react-router'

import { Router, Route } from 'react-router'

import WelcomePage      from './components/Welcome'
import App              from './components/App'
import Auth             from './components/Auth'
import SignUp           from './components/Auth/SignUpForm'
import SignIn           from './components/Auth/SignInForm'
import House            from './components/House'
import Search           from './components/SearchPage'

export default (
  <Router history = { browserHistory} >
    <Route component = { App } >
      <Route path = "/house/:id" component = { House } />
      <Route path = "/" component={ WelcomePage } />
      <Route path = '/search' component = { Search } />
    </Route>
  </Router>
)
