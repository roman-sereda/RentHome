import React, { Component } from 'react'
import styles from './styles.css'

import Button from '../Button'

export default class Card extends Component{
  render(){
    return(
      <span>
        <div className = 'card'>
          <div className = 'description black-text'>Трихкімнатна квартира в центрі Рівного</div>
          <div className = 'town'>м.Рівне</div>
          <div className = 'card-image-wrapper'>
            <img src = 'https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg' className = 'card-image' />
          </div>
          <div className = 'price blue-text' >
            <span className = 'price-text'>899</span>
            <span className = 'price-text secondary'>грн/міс</span>
          </div>
          <Button label = 'Перегляд' />
        </div>
      </span>
    )
  }
}
