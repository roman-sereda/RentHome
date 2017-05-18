import React, { Component } from 'react'

import Button from '../Button'
import Role from './Role'

export default class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = { role: null}
  }

  changeRole(role){
    this.setState({ role: role })
  }

  render(){
    return(
      <div>
        <Role changeRole = {( role ) => this.changeRole( role )} />
        <div className = 'space-between-auth-buttons' />
        <div className = 'auth-social-button'><Button label = 'Увійти через Facebook' link = '/#' /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти через Goole+' link = '/#' /></div>
        <div className = 'black-text auth-separator-text'> Або </div>
        <div className = 'auth-input' ><input placeholder = 'Email' className = 'email-input input' /></div>
        <div className = 'auth-input' ><input placeholder = 'Пароль' className = 'pass-input input' /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти' link = '/#' /></div>
      </div>
    )
  }
}
