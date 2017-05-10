import React, { Component } from 'react'
import styles from './styles.css'

import SignUp from './SignUpForm'
import SignIn from './SignInForm'

export default class Auth extends Component {

  render() {
    return (
      <div className = 'modal-window-show' >
        { this.props.children }
      </div>
    );
  }
};
