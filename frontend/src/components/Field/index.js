import React, { Component } from 'react'
import styles from './styles.css'

import { Grid, Row, Col } from 'react-flexbox-grid'

import Button from '../Button'
import Calendar from '../Calendar'

const search_bar_conf = {
  lg:8,  md: 10, sm: 10, xs: 10
}

const input_conf = {
  placeholder: 'Введіть назву міста'
}

export default class Field extends Component{

  isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       return true
    }
    return false
  }

  render(){
    return(
      <Row>
        <Col lg = {2} md = {1} sm = {1} xs = {1} />
        <Col {...search_bar_conf} className = { this.isMobile() ? "search-bar-mob" : "search-bar" }>
          <div>
            <input {...input_conf} className = 'input' />
            <span className = 'search-calendar'><Calendar type='Arrival' /></span>
            <span className = 'search-calendar'><Calendar type='Departure' /></span>
            <Button label = 'Шукати' />
          </div>
        </Col>
        <Col lg = {2} md = {1} sm = {1} xs = {1} />
      </Row>
    )
  }
}
