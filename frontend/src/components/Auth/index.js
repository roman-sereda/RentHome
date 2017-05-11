import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.css'

import SignUp from './SignUpForm'
import SignIn from './SignInForm'

export default class Auth extends Component {

  componentDidMount(){
    console.log( this.props.route.auth )
    this.addPressButtonEffect( this.props.routes[2].auth )
  }

  addPressButtonEffect(button){
    document.getElementById('signin').className = 'auth-button blue-text'
    document.getElementById('signup').className = 'auth-button blue-text'
    document.getElementById(button).className = 'auth-button white-text pressed'
  }

  render() {
    return (
      <div className = 'modal-window-show' >
        <div className = 'auth-window'>
          <div className = 'auth-buttons'>
            <Link to = '/auth/signin' onClick = {() => this.addPressButtonEffect('signin')}><span id = 'signin' className = 'auth-button blue-text'>Увійти в обліковий запис</span></Link>
            <Link to = '/auth/signup' onClick = {() => this.addPressButtonEffect('signup')}><span id = 'signup' className = 'auth-button blue-text'>Зареєструватися</span></Link>
          </div>
          { this.props.children }
        </div>
      </div>
    );
  }
};
