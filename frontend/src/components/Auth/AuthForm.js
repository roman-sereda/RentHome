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
        <input type="email" ref='email' placeholder="Email" />

        <label>Password</label>
        <input type="password" ref='password' placeholder="Password" />

        <button onClick={this.props.onSubmit}>
          Log in
        </button>
      </div>
    );
  }
};
