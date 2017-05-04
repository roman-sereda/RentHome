import React, { Component } from 'react'
import styles from './styles.css'

import Button from '../Button'

const links = [
  ['Довготермінова оренда', '/#'],
  ['Квартири подобово', '/#'],
  ['Зняти квартиру', '/#'],
  ['Зняти кімнату', '/#']
]

export default class Header extends Component{
  render(){
    return(
      <div className = 'header full-width'>
        <span className = 'header-image-wrapper cell'>
          <img className = 'header-image' />
        </span>
        <span className = 'header-links-wrapper cell' >
          { links.map((link, index) => {
            return(
              <span key = { link[0]} >
                { index == 0 ? null : <span className = 'separator' >|</span>}
                <span>{ link[0] }</span>
              </span>
            )
          })}
        </span>
        <span className = 'auth-buttons cell'>
          <Button label = 'Зареєструватися' />
          <Button label = 'Увійти' />
        </span>
      </div>
    )
  }
}
