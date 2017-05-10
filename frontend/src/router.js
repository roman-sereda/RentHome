import React from 'react'
import { browserHistory } from 'react-router'

import { Router, Route } from 'react-router'

import WelcomePage      from './components/Welcome'
import Auth             from './components/Auth'
import SignUp           from './components/Auth/SignInForm'
import SignIn           from './components/Auth/SignUpForm'

export default (
  <Router history = { browserHistory} >
    <Route path="/" component={ WelcomePage } >
      <Route path="/auth" component={ Auth } >
        <Route path = '/auth/signin' component={ SignIn } />
        <Route path = '/auth/signup' component={ SignUp } />
      </Route>
    </Route>
  </Router>
)
