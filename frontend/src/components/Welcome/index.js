import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import Button from '../Button'
import Card from '../Card'

const col_conf = {
  lg: 4, md: 4, sm: 6, xs: 12
}

const img_conf = {
  lg: 6, md: 6, sm: 12, xs: 12
}

const txt_conf = {
  lg: 5, md: 5, sm: 12, xs: 12,
  lgOffset: 1, mdOffset: 1
}

export default class WelcomePage extends Component{
  render(){
    return(
      <span>

        <div className = 'middle-wave'></div>
          <Row>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
          </Row>
          <Row style = {{ marginBottom: '50px', marginTop: '60px'}}>
            <Col {...img_conf} ><Card card_type = 'img' /></Col>
            <Col {...txt_conf} ><Card card_type = 'txt' /></Col>
          </Row>
          <Row style = {{ marginBottom: '50px', marginTop: '60px'}}>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
          </Row>
          <div className = 'show-all-button'>
            <Button label = 'Переглянути всі варіанти' white />
          </div>
      </span>
    )
  }
}
