import React, { Component } from 'react'
import styles from './styles.css'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Footer from '../Footer'
import Header from '../Header'
import Carousel from '../Carousel'
import Field from '../Field'

export default class App extends Component{
  render(){
    return(
      <span>
        <Header />
        { this.props.routes[1].path == '/' ?
            <span><Carousel />
            <Field /></span> : null}
          <Row>
            <Col lgOffset = { 2 } lg = { 8 } smOffset = { 0 } xsOffset = { 0 } sm = { 12 } xs = { 12 }>
              { this.props.children }
            </Col>
          </Row>
        <Footer />
      </span>
    )
  }
}
