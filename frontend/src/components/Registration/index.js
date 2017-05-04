import React, { Component } from 'react'

import RegistrationForm from './RegistrationForm'

export default class AuthPage extends Component {

  onSubmit() {
    let user = {};

    user.name     = this.refs.registrationForm.refs.name.value
    user.nickname = this.refs.registrationForm.refs.nickname.value
    user.email    = this.refs.registrationForm.refs.email.value
    user.password = this.refs.registrationForm.refs.password.value
    user.password_confirmation = this.refs.registrationForm.refs.passwordConfirmation.value

    console.log(user)
  }

  render() {
    return (
      <div>
        <RegistrationForm onSubmit={this.onSubmit.bind(this)} ref="registrationForm" />
      </div>
    );
  }
};
