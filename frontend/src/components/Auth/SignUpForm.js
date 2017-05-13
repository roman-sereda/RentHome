import React, { Component } from 'react'

import Button from '../Button'

import { createUser,
         createSessionWithFacebook,
         createUserWithGoogle } from '../../auth/authRequest'

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = { role: null}
  }

  chooseRole(role){
    this.setState({ role: role })
  }

  addEffectToChosenRole(role){
    console.log(this)
    document.getElementById('search').className = 'auth-block blue-text'
    document.getElementById('rent').className = 'auth-block blue-text'
    document.getElementById(role).className = 'auth-block blue-text chosen-role'
  }

  registrationEmail(){

    let dataUser = {}

    console.log(this.refs['email-input'].value)

    dataUser.email =                  this.refs['email-input'].value
    dataUser.password =               this.refs['pass-input'].value

    createUser(dataUser)
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
