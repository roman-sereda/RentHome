import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

const params = [
  ['Тип житла', 'Кількість кімнат', 'Кількість спальних місць', 'Загальна площа'],
  ['Адреса', 'Поверх', 'Квартира']
]

const params2 = [
  ['Wi-Fi', 'Dog-Mandy', 'Dog-Mandy'],
  ['Кондиціонер', 'Мобільна кухня', 'Блять', 'Обама']
]

const temp_data = [['b', 'l', 'y', 'at'], ['o', 'b', 'ama']]

export default class House extends Component{
  render(){
    return(
      <span>
        <Row>
          <Col lg  = '7'>
            <div className = 'template'>
              <img src = '/' className = 'house-image' />
            </div>
            <div className = 'template house-description'>
              <div className = 'house-description-main' >Блять Обама</div>
              <Row>
                <Col lg = { 6 } className = 'left black-text'>
                  { params[0].map((param, index) => {
                    return(
                      <p className = 'house-param' key = { index }>{ param }: { temp_data[0][index] }</p>
                    )
                  })}
                </Col>
                <Col lg = { 6 } className = 'left black-text'>
                  { params[1].map((param, index) => {
                    return(
                      <p className = 'house-param' key = { index }>{ param }: { temp_data[1][index] }</p>
                    )
                  })}
                </Col>
              </Row>
              <Row>
                <Col lg = { 4 } className = 'left black-text'>
                  { params2[0].map((param, index) => {
                    return(
                      <p className = 'house-param' key = { index }>{ param }</p>
                    )
                  })}
                </Col>
                <Col lg = { 4 } className = 'left black-text'>
                  { params2[1].map((param, index) => {
                    return(
                      <p className = 'house-param' key = { index }>{ param }</p>
                    )
                  })}
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg  = '5'>
            <div className = 'template'>
              a
            </div>
            <div className = 'template'>
              <img src = '/' className = 'house-map' />
            </div>
          </Col>
        </Row>
        <div className = 'template'>
          hyi
        </div>
      </span>
    )
  }
}
