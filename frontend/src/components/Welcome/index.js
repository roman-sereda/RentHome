import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import Button from '../Button'
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
        <div className = 'middle-wave'></div>
        <Grid>
          <Row>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
          </Row>
          <Row style = {{ marginBottom: '50px', marginTop: '60px'}}>
            <Col lg = {7} ><Card card_type = 'img' /></Col>
            <Col lg = {5} ><Card card_type = 'txt' /></Col>
          </Row>
          <Row style = {{ marginBottom: '50px', marginTop: '60px'}}>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
            <Col {...col_conf} ><Card card_type = 'img-txt' /></Col>
          </Row>
          <div className = 'show-all-button'>
            <Button label = 'Переглянути всі варіанти' white />
          </div>
        </Grid>
        <Footer />
      </span>
    )
  }
}
