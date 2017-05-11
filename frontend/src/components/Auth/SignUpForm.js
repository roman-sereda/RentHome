import React, { Component } from 'react'

import Button from '../Button'

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
