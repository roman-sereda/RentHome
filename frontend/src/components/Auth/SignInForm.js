import React, { Component } from 'react'

import Button from '../Button'
import Role from './Role'

import { authUser } from '../../auth/requestUser'

export default class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = { role: null}
  }

  changeRole(role){
    this.setState({ role: role })
  }

  getUserInfo(){
    let dataUser = {}

    dataUser.email =    this.refs['email-input'].value
    dataUser.password = this.refs['pass-input'].value

    authUser({way: 'emailLogin', role: this.state.role, dataUser: dataUser})
  }

  render(){
    return(
      <div>
        <Role changeRole = {( role ) => this.changeRole( role )} />
        <h3 className = 'black-text auth-separator-text'></h3>
        <div className = 'auth-social-button'><Button label = 'Увійти через Facebook' handleClick = {() => authUser({way: 'facebook', role: this.state.role}) } /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти через Google+' handleClick = {() => authUser({way: 'google', role: this.state.role}) } /></div>
        <div className = 'black-text auth-separator-text'> Або </div>
        <div className = 'auth-input' ><input placeholder = 'Email' className = 'email-input input' ref='email-input' /></div>
        <div className = 'auth-input' ><input placeholder = 'Пароль' className = 'pass-input input' ref='pass-input' /></div>
        <div className = 'auth-social-button' ><Button label = 'Увійти' handleClick = {() => this.getUserInfo()} /></div>
      </div>
    )
  }
}
