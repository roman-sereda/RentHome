import React from 'react'
import { browserHistory } from 'react-router'

import { Router, Route } from 'react-router'

import WelcomePage      from './components/Welcome'
import Auth             from './components/Auth'
import SignUp           from './components/Auth/SignUpForm'
import SignIn           from './components/Auth/SignInForm'

export default (
  <Router history = { browserHistory} >
    <Route path="/" component={ WelcomePage } >
      <Route path="/auth" component={ Auth } >
        <Route path = '/auth/signin' component={ SignIn } auth = 'signin' />
        <Route path = '/auth/signup' component={ SignUp } auth = 'signup' />
      </Route>
    </Route>
  </Router>
)
