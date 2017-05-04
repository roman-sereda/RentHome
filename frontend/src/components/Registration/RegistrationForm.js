import React, { Component } from 'react'


export default class RegistrationPage extends Component {

  render() {
    return (
      <div>
        <h1>Registration</h1>

        <label>Name</label>
        <input type="name" ref='name' placeholder="Name" />

        <label>Nickname</label>
        <input type="nickname" ref='nickname' placeholder="Nickname" />

        <label>Email</label>
        <input type="email" ref='email' placeholder="Email" />

        <label>Password</label>
        <input type="password" ref='password' placeholder="Password" />

        <label>Password confirmation</label>
        <input type="passwordConfirmation" ref='passwordConfirmation' placeholder="Password confirmation" />

        <button onClick={this.props.onSubmit}>
          Registration
        </button>
      </div>
    );
  }
};
