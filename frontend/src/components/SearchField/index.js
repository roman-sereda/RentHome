import React, { Component } from 'react'
import styles from './styles.css'

import { Grid, Row, Col } from 'react-flexbox-grid'

import Button from '../Button'

const search_bar_conf = {
  lg: 8
}

const input_conf = {
  placeholder: 'Введіть назву міста'
}

export default class SearchField extends Component{
  render(){
    return(
      <Row>
        <Col lg = {2} />
        <Col {...search_bar_conf} className = 'search-bar'>
          <span >
            <input {...input_conf} className = 'search-bar-input' />
            <Button label = 'Шукати' />
          </span>
        </Col>
      </Row>
    )
  }
}
