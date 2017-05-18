import React, { Component } from 'react'

import Button from '../Button'
import Role from './Role'

import { createUser,
         createSessionWithFacebook,
         createUserWithGoogle } from '../../auth/authRequest'

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = { role: null}
  }

  changeRole(role){
    this.setState({ role: role })
  }

  registrationEmail(){

    console.log(this.refs['email-input'].value)

    dataUser.email =                  this.refs['email-input'].value
    dataUser.password =               this.refs['pass-input'].value

    createUser(dataUser)
  }

  render(){
    return(
      <div>
        <Role changeRole = {( role ) => this.changeRole( role )} />
        <div className = 'auth-social-button'><Button label = 'Увійти через Facebook' handleClick = {() => createSessionWithFacebook() } /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти через Google+' handleClick = {() => createUserWithGoogle() } /></div>
        <div className = 'black-text auth-separator-text'> Або </div>
        <div className = 'auth-input' ><input placeholder = 'Email' className = 'email-input input' ref='email-input' /></div>
        <div className = 'auth-input' ><input placeholder = 'Пароль' className = 'pass-input input' ref='pass-input' /></div>
        <div className = 'auth-social-button' ><Button label = 'Зареєструватися' handleClick = {() => this.registrationEmail()} /></div>
      </div>
    )
  }
}
