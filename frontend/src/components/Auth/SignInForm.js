import React, { Component } from 'react'

import Button from '../Button'

export default class SignIn extends Component {

  render(){
    return(
      <div>
        <div className = 'space-between-auth-buttons' />
        <div className = 'auth-social-button'><Button label = 'Увійти через Facebook' link = '/#' /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти через Goole+' link = '/#' /></div>
        <div className = 'black-text auth-separator-text'> Або </div>
        <div className = 'auth-input' ><input placeholder = 'Email' className = 'email-input input' /></div>
        <div className = 'auth-input' ><input placeholder = 'Пароль' className = 'pass-input input' /></div>
        <div className = 'auth-social-button'><Button label = 'Зареєструватися' link = '/#' /></div>
      </div>
    )
  }
}
