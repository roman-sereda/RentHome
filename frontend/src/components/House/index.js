import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import { getHouse } from '../../actions/house'
import Loading from '../Loading'

class House extends Component{

  componentDidMount(){
    this.props.getHouse(this.props.params.id)
  }

  render(){

    const { rooms, wi_fi, animals_allowed, conditioner, kitchen, parking, description } = this.props.house

    return(
      <span>
        { this.props.isFetching ? <Loading /> :
        <span>
          <Row>
            <Col lg = { 7 }>
              <div className = 'template'>
                <img src = '/' className = 'house-image' />
              </div>
              <div className = 'template house-description'>
                <div className = 'house-description-main' >{ description }</div>
                <Row>
                  <Col lg = { 6 } className = 'left black-text'>
                    <p className = 'house-param' >Тип житла: X </p>
                    <p className = 'house-param' >Кількість кімнат: { rooms }</p>
                    <p className = 'house-param' >Кількість спальних місць: X </p>
                    <p className = 'house-param' >Загальна площа: X</p>
                  </Col>
                  <Col lg = { 6 } className = 'left black-text'>
                    <p className = 'house-param' >Адреса: X </p>
                    <p className = 'house-param' >Поверх: X </p>
                    <p className = 'house-param' >Квартира: X </p>
                  </Col>
                </Row>
                <Row>
                  <Col lg = { 4 } className = 'left black-text'>
                    { wi_fi ? <p className = 'house-param'>Wi-Fi</p> : null}
                    { animals_allowed ? <p className = 'house-param'>Dog Friendly</p> : null}
                    { animals_allowed ? <p className = 'house-param'>Dog Friendly</p> : null}
                  </Col>
                  <Col lg = { 4 } className = 'left black-text'>
                    { conditioner ? <p className = 'house-param'>Кондиціонер</p> : null}
                    { kitchen ? <p className = 'house-param'>Мебльована кухня</p> : null}
                    { parking ? <p className = 'house-param'>Гараж/Парковка</p> : null}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg  = { 5 }>
              <div className = 'template'>
                a
              </div>
              <div className = 'template'>
                <img src = '/' className = 'house-map' />
              </div>
            </Col>
          </Row>
          <div className = 'template'>
            hyi
          </div>
        </span>
      }
      </span>
    )
  }
}

const mapStateToProps = state => ({
  house: state.house.data,
  isFetching: state.house.isFetching
})

const mapDispatchToProps = dispatch => ({
  getHouse: ( id ) => {
    dispatch(getHouse( id ))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(House);
