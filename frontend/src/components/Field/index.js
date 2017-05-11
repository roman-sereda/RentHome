import React, { Component } from 'react'
import styles from './styles.css'

import { Grid, Row, Col } from 'react-flexbox-grid'

import Button from '../Button'
import Calendar from '../Calendar'

const search_bar_conf = {
  lg:8,  md: 10, sm: 12, xs: 12
}

const input_conf = {
  placeholder: 'Введіть назву міста'
}

export default class Field extends Component{
  render(){
    return(
      <Row>
        <Col lg = {2} md = {1} />
        <Col {...search_bar_conf} className = 'search-bar'>
          <span >
            <input {...input_conf} className = 'input' />
            <span className = 'search-calendar'><Calendar label = 'Виберіть дату заїзду' /></span>
            <span className = 'search-calendar'><Calendar label = 'Виберіть дату виїзду' /></span>
            <Button label = 'Шукати' />
          </span>
        </Col>
      </Row>
    )
  }
}
