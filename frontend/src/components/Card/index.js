import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.css'

import Button from '../Button'

export default class Card extends Component{

  imageWithTextCard(){

    const { price_per_month, city } = this.props.house

    return(
      <div className = 'card'>
        <div className = 'img-txt'>
          <Link to = '/house/10000'><div className = 'description black-text'>Трихкімнатна квартира в центрі Рівного</div></Link>
          <div className = 'town'>{ city }</div>
          <div className = 'card-image-wrapper'>
            <img src = 'https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg' className = 'card-image' />
          </div>
          <div className = 'price blue-text' >
            <span className = 'price-text'>{ price_per_month }</span>
            <span className = 'price-text secondary'>грн/міс</span>
          </div>
          <Button label = 'Перегляд' className = 'card-button' />
        </div>
      </div>
    )
  }

  imageCard(){
    return(
      <div className = 'card img' >
        <div className = 'img-card-image-wrapper' style = {{ backgroundImage: "url('https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg')"}}></div>
      </div>
    )
  }

  textCard(){
    return(
      <div className = 'card txt'>
        <div className = 'txt-title black-text'>Як здати житло в оренду?</div>
        <div className = 'txt-text black-text'>
          Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда
          приемлимые модификации, например, юмористические вставки или
        </div>
        <Button label = 'Здати Житло' className = 'txt-button' />
      </div>
    )
  }

  render(){
    const card = this.props.card_type == 'img-txt' ?
                    this.imageWithTextCard() :
                      this.props.card_type == 'img' ?
                        this.imageCard() :
                        this.textCard()
    return(
      <span>
        { card }
      </span>
    )
  }
}
