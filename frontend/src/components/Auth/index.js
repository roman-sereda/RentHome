import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import styles from './styles.css'

import SignUp from './SignUpForm'
import SignIn from './SignInForm'

export default class Auth extends Component {

  componentDidMount(){
    window.addEventListener('click', (e) => this.handleClick(e))
  }

  handleClick(event){
    var modal = document.getElementById('modal-window')
    if(event.target == modal){
      console.log('hyi')
      this.props.hideAuthPopup()
    }
  }

  render() {

    const { currentPage } = this.props
    console.log( currentPage )

    return (
      <div id = 'modal-window' className = 'modal-window-show' >
        <div className = 'auth-window'>
          <div className = 'auth-buttons'>
            <span id = 'signin' className = { currentPage == 'signin' ? 'auth-button white-text pressed' : 'auth-button blue-text' } onClick = {() => this.props.showAuthPopup('signin')} >Увійти в обліковий запис</span>
            <span id = 'signup' className = { currentPage == 'signup' ? 'auth-button white-text pressed' : 'auth-button blue-text' } onClick = {() => this.props.showAuthPopup('signup')} >Зареєструватися</span>
          </div>
          { currentPage == 'signin' ?
            <SignIn /> :
            <SignUp />}
        </div>
      </div>
    );
  }
};
