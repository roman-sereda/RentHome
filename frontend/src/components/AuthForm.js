import React, { Component } from 'react'

export default class AuthPage extends Component {

  getEmail() {
    return this.refs.email.value;
  }

  getPassword() {
    return this.refs.password.value;
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>

          <label>Email</label>
          <input type="email" name="LoginEmail" id="LoginEmail" placeholder="Email" ref="email" />

          <label>Password</label>
          <input type="password" name="LoginPassword" id="LoginPassword" placeholder="Password" ref="password" />

          <button onClick={this.props.onSubmit}>
            Log in
          </button>
      </div>
    )
  }
}
