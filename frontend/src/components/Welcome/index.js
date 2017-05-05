import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import Footer from '../Footer'
import Header from '../Header'
import Card from '../Card'
import Carousel from '../Carousel'
import SearchField from '../SearchField'

const col_conf = {
  lg: 4
}

export default class WelcomePage extends Component{
  render(){
    return(
      <span>
        <Header />
        <Carousel />
        <SearchField />
        <Grid>
          <Row>
            <Col {...col_conf} ><Card /></Col>
            <Col {...col_conf} ><Card /></Col>
            <Col {...col_conf} ><Card /></Col>
          </Row>
        </Grid>
        <Footer />
      </span>
    )
  }
}
