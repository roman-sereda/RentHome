import React, { Component } from 'react'

import AuthForm from './AuthForm'

export default class AuthPage extends Component {

  onSubmit() {
    event.preventDefault();
    let user = {};

    user.email      = this.refs.authForm.refs.email.value
    user.password   = this.refs.authForm.refs.password.value

    console.log(user)
  }

  render() {
    return (
      <div>
        <AuthForm onSubmit={this.onSubmit.bind(this)} ref="authForm" />
      </div>
    );
  }
};
