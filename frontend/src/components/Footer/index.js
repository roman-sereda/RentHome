import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'
import { Link } from 'react-router'

const data = [
  [['Компанія', '/#'],
  ['Партнерам', '/#'],
  ['Про RENT HOME', '/#'],
  ['Мобільний додаток', '/#']],
  [['Безпечні угоди', '/#'],
  ['Допомога', '/#'],
  ['Пропозиції', '/#'],
  ['Ріелторам', '/#']],
  [['Агенствам', '/#'],
  ['Забудовникам', '/#'],
  ['Зворотній зв’язок', '/#'],
  ['Карта сайту', '/#']],
]

const feedback = [
  'facebook',
  'vk',
  'instagram',
  'google',
  'printerest',
  'viber',
  'skype'
]

const logo_conf = {
  lgOffset: 2,
  lg: 1, sm: 12, xs: 12 }

const text_conf = {
  lg: 5, sm: 12, xs: 12 }

const text_el_conf = {
  lg: 4, sm: 4, xs: 4 }

const feedback_conf = {
  lg: 3, sm: 12, xs: 12 }

export default class Footer extends Component{
  render(){
    return(
      <div className = 'footer'>
        <div className = 'footer-top'>
          <Row>
            <Col {...logo_conf}>
              <span className = 'footer-in-wrapper'>
                <img className = 'footer-image' src = '/footer-logo.png' />
              </span>
            </Col>
            <Col {...text_conf} >
              <Row>
                {data.map((col, index) => {
                  return(
                    <Col {...text_el_conf} key = { 'footer_col' + index }>
                      <div className = 'footer-text-block footer-text' key = { 'footer-col-' + col } >
                        {col.map((el, index) => {
                          return(
                            <Link to = { el[1] } key = { 'footer-el-' + index } className = 'white-text footer-text'>
                              { el[0] }<br />
                            </Link>
                          )
                        })}
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col {...feedback_conf}>
              <span className = 'feedback-buttons'>
                { feedback.map((label, index) => {
                  return(
                    <img key = { 'footer-img' + index} src = { '/' + label + '.png' } className = 'feedback-icon' />
                  )
                })}
              </span>
            </Col>
          </Row>
        </div>
        <div className = 'footer-bottom full-width'>
          <p className = 'copyrights'>© 2017-2020 RentHome.ua. Всі права захищені</p>
        </div>
      </div>
    )
  }
}
