import React, { Component } from 'react'

import Button from '../Button'

import { authUser } from '../../auth/requestUser'


export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = { role: "Ви шукаєте чи здаєте житло?"}
  }

  chooseRole(role){
    this.setState({ role: role })
  }

  addEffectToChosenRole(role){
    console.log(this)
    document.getElementById('search').className = 'auth-block blue-text'
    document.getElementById('rent').className = 'auth-block blue-text'
    document.getElementById(role).className = 'auth-block blue-text chosen-role'

    let message

    if (role == 'rent') {
      message = 'Здаю'
    }
    else {
      message = 'Шукаю'
    }

    this.chooseRole(message)
  }

  getUserInfo(){
    let dataUser = {}

    dataUser.email =    this.refs['email-input'].value
    dataUser.password = this.refs['pass-input'].value

    authUser({way: 'emailRegistration', role: this.state.role, dataUser: dataUser})
  }

  render(){
    return(
      <div>
        <div className = 'auth-blocks'>
          <div  className = 'auth-block-wrapper' >
            <div onClick = { () => this.addEffectToChosenRole('search')} id = 'search' className = 'auth-block blue-text'>
              <img src = '/loop.png' />
              <div className = 'auth-button-label' >Я шукаю житло</div>
            </div>
          </div>
          <div className = 'auth-block-wrapper' >
            <div onClick = { () => this.addEffectToChosenRole('rent')} id = 'rent' className = 'auth-block blue-text'>
              <img src = '/home.png' />
              <div className = 'auth-button-label' >Я здаю житло</div>
            </div>
          </div>
        </div>
        <h3 className = 'black-text auth-separator-text'>{this.state.role}</h3>
        <div className = 'auth-social-button'><Button label = 'Увійти через Facebook' handleClick = {() => authUser({way: 'facebook', role: this.state.role}) } /></div>
        <div className = 'auth-social-button'><Button label = 'Увійти через Google+' handleClick = {() => authUser({way: 'google', role: this.state.role}) } /></div>
        <div className = 'black-text auth-separator-text'> Або </div>
        <div className = 'auth-input' ><input placeholder = 'Email' className = 'email-input input' ref='email-input' /></div>
        <div className = 'auth-input' ><input placeholder = 'Пароль' className = 'pass-input input' ref='pass-input' /></div>
        <div className = 'auth-social-button' ><Button label = 'Зареєструватися' handleClick = {() => this.getUserInfo()} /></div>
      </div>
    )
  }
}
