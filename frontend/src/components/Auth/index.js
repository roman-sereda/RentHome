import React, { Component } from 'react'

import SignUp from './SignUpForm'
import SignIn from './SignInForm'

export default class Auth extends Component {

  render() {
    return (
      <div>
        <SignUp />
      </div>
    );
  }
};
