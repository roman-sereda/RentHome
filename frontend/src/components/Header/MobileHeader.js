import React, { Component } from 'react'

import styles from './styles.css'

import Button from '../Button'

export default class MobileHeader extends Component {
  constructor(props){
    super(props)

    this.state = { open: false }
  }

  onNavbar(){
    document.getElementById('mob').style.right = '0'
  }

  offNavbar(){
    document.getElementById('mob').style.right = '-100vw'
  }

  render(){
    return(
      <div className = 'header-mob full-width'>
        <span className = 'header-navbar-button-wrapper-search header-cell'>
          <img className = 'header-navbar-button' />
        </span>
        <span className = 'header-image-wrapper header-cell'>
          <img src = 'header-logo.png' className = 'header-image' />
        </span>
        <span className = 'header-navbar-button-wrapper header-cell'>
          <img onClick = { () => this.onNavbar() } className = 'header-navbar-button' />
        </span>
        <span className = 'header-links-wrapper-mob' id = 'mob' >
          { this.props.links.map((link, index) => {
            return(
              <div className = 'blue-text mob-el' key = { link[0]} >
                { link[0] }
              </div>
            )
          })}
          <span className = 'auth-buttons cell'>
            <span className = 'header-auth-button'><Button link = '/auth/signup' label = 'Зареєструватися' /></span>
            <span className = 'header-auth-button'><Button link = '/auth/signin' label = 'Увійти' /></span>
          </span>
          <span className = 'header-navbar-button-wrapper-search header-cell'>
            Close: <img onClick = { () => this.offNavbar() } className = 'header-navbar-button' />
          </span>
        </span>
      </div>
    )
  }
}
