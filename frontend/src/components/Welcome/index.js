import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Footer from '../Footer'
import Header from '../Header'
import Card from '../Card'

const col_props = {
  lg: 4
}

export default class WelcomePage extends Component{
  render(){
    return(
      <span>
        <Header />
        <Grid>
          <Row>
            <Col {...col_props} ><Card /></Col>
            <Col {...col_props} ><Card /></Col>
            <Col {...col_props} ><Card /></Col>
          </Row>
        </Grid>
        <Footer />
      </span>
    )
  }
}
