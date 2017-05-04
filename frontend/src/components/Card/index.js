import React, { Component } from 'react'
import styles from './styles.css'

import Button from '../Button'

export default class Card extends Component{
  render(){
    return(
      <div className = 'card'>
        <div className = 'description'>Трихкімнатна квартира в центрі Рівного</div>
        <div className = 'town'>м.Рівне</div>
        <div className = 'price' >
          <span className = 'price-text'>899</span>
          <span className = 'price-text secondary'>грн/міс</span>
        </div>
        <Button label = 'Перегляд' />
      </div>
    )
  }
}
