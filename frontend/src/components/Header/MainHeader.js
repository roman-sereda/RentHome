import React, { Component } from 'react'
import styles from './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Button from '../Button'

export default class MainHeader extends Component {
  render(){
    return(
      <div className = 'header full-width'>
        <Col lgOffset = { 2 } lg = { 8 }>
          <span className = 'header-cell'>
            <img src = 'header-logo.png' className = 'header-image' />
          </span>
          <span className = 'header-links-wrapper header-cell' >
            { this.props.links.map((link, index) => {
              return(
                <span className = 'blue-text' key = { link[0]} >
                  { index == 0 ? null : <span className = 'separator' >|</span>}
                  <span>{ link[0] }</span>
                </span>
              )
            })}
          </span>
          <span className = 'header-auth-buttons header-cell'>
            <span className = 'header-auth-button'><Button handleClick = { () => this.props.showAuthPopup('signup') } label = 'Зареєструватися' /></span>
            <span className = 'header-auth-button'><Button handleClick = { () => this.props.showAuthPopup('signin') } label = 'Увійти' /></span>
          </span>
        </Col>
      </div>
    )
  }
}
