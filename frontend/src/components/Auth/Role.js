import React, { Component } from 'react'
import styles from './styles.css'



export default class Role extends Component{

  addEffectToChosenRole(role){
    document.getElementById('search').className = 'auth-block blue-text'
    document.getElementById('rent').className = 'auth-block blue-text'
    document.getElementById(role).className = 'auth-block blue-text chosen-role'
    this.props.changeRole(role)
  }

  render(){
    return(
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
  )}
}
