import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import { getHouses } from '../../actions/houses'

import Button from '../Button'
import Card from '../Card'
import Loading from '../Loading'

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

class WelcomePage extends Component{

  componentWillMount(){
    this.props.getHouses( null )
  }

  render(){
    console.log(this.props.houses)
    return(
      <span>
        <div className = 'middle-wave'></div>
          {this.props.houses.isFetching ?
            <Loading /> :
            <Row>
              {this.props.houses.slice(0,3).map((house, index) => {
                  return(
                    <Col key = { 'card_' + index} {...col_conf} ><Card house = { house } card_type = 'img-txt' /></Col>
                  )
                })
              }
            </Row>}
          <Row style = {{ marginBottom: '50px', marginTop: '60px'}}>
            <Col {...img_conf} ><Card card_type = 'img' /></Col>
            <Col {...txt_conf} ><Card card_type = 'txt' /></Col>
          </Row>
          {this.props.houses.isFetching ?
            <Loading /> :
            <Row>
              {this.props.houses.slice(0,3).map((house, index) => {
                  return(
                    <Col key = { 'card_' + index} {...col_conf} ><Card house = { house } card_type = 'img-txt' /></Col>
                  )
                })
              }
            </Row>}
          <div className = 'show-all-button'>
            <Button label = 'Переглянути всі варіанти' white />
          </div>
      </span>
    )
  }
}

const mapStateToProps = state => ({
  houses: state.houses.data,
  isFetching: state.houses.isFetching
})

const mapDispatchToProps = dispatch => ({
  getHouses: ( filters ) => {
    dispatch(getHouses( filters ))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
