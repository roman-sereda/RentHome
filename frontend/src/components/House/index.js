import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

export default class House extends Component{
  render(){
    return(
      <span>
        <Row>
          <Col lg  = '7'>
            <div className = 'template'>
              a
            </div>
            <div className = 'template'>
              a
            </div>
          </Col>
          <Col lg  = '5'>
            <div className = 'template'>
              a
            </div>
            <div className = 'template'>
              a
            </div>
          </Col>
        </Row>
      </span>
    )
  }
}
