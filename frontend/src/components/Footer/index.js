import React, { Component } from 'react'
import styles from './styles.css'

const data = [
  [['Компанія', '/#'],
  ['Партнерам', '/#'],
  ['Про RENT HOME', '/#'],
  ['Мобільний додаток', '/#']],
  [['Безпечні угоди', '/#'],
  ['Допомога', '/#'],
  ['пропозиції', '/#'],
  ['Ріелторам', '/#']],
  [['Агенствам', '/#'],
  ['Забудовникам', '/#'],
  ['Зворотній зв’язок', '/#'],
  ['Карта сайту', '/#']],
]

export default class Footer extends Component{
  render(){
    return(
      <div className = 'footer full-width'>
        <div className = 'footer-top full-width'>
          <span className = 'footer-in-wrapper'>
            <img className = 'footer-image' />
          </span>
          <span className = 'footer-in-wrapper'>
            {data.map((col) => {
              return(
                <div className = 'footer-text-block' key = { 'footer-col-' + col } >
                  {col.map((el) => {
                    return(
                      <p key = { 'footer-el-' + el } className = 'white-text footer-text'>{ el[0] }</p>
                    )
                  })}
                </div>
              )
            })}
          </span>
          <span className = 'footer-in-wrapper feedback-buttons' >
            Feedback Buttons
          </span>
        </div>
        <div className = 'footer-bottom full-width'>
          <p className = 'copyrights'>© 2017-2020 RentHome.ua. Всі права захищені</p>
        </div>
      </div>
    )
  }
}
