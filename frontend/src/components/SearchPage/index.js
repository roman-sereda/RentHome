import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './styles.css'

import Button from '../Button'
import Loading from '../Loading'
import Card from '../Card'
import { getHouses } from '../../actions/houses'

const house_params = {
  lg: 4, md: 4, sm: 6, xs: 12
}

const checkboxes = ['Wi-Fi', 'Dog-Friendly', 'Кондиціонер', 'Гараж/Парковка', 'Автономне опалення', 'Мебльована кухня']

class SearchPage extends Component{

  componentDidMount(){
    this.props.getHouses( null )
  }

  render(){

    const { isFetching, houses } = this.props

    return(
      <span>
        <Col lgOffset = { 0 } lg = { 12 } >
          <div className = 'card search-bar-props' >
            <div className = 'search-bar-background' ><div className = 'search-bar-gradient' /></div>
            <Row className = 'search-bar-row'>
              <input className = 'input search-bar-field' placeholder = 'Введіть назву міста' />
              <input className = 'input search-bar-field' placeholder = 'Виберіть тип житла' />
              <input className = 'input search-bar-field' placeholder = 'Виберіть дату заїзду' />
              <span className = 'search-accept-button'><Button label = 'Застосувати фільтр' /></span>
            </Row>
            <Row className = 'search-bar-row'>

              { checkboxes.map((label, index) => { return(
                <span key = {'checkobox_' + index } className = 'search-bar-checkbox'><input id = {'chk' + index} type = 'checkbox' /><label className = 'blue-text' htmlFor = {'chk' + index}> { label } </label></span>
              )})}
            </Row>
            <Row className = 'search-bar-row'>
              <div className = 'search-counter'><label htmlFor = 'days-counter' className = 'counter-label blue-text'>Кількість кімнат</label><input id = 'days-counter' name = 'days' className = 'input' type = 'number' min = "1" /></div>
              <div className = 'search-counter'><label htmlFor = 'floor-counter' className = 'counter-label blue-text'>Поверх</label><input id = 'floor-counter' className = 'input' type = 'number' mmin = "1" /></div>
              </Row>
          </div>
        </Col>
        { isFetching ?
          <Loading /> :
          <Row>
            { houses.map((house, index) => {
              return(
                <Col {...house_params} key = { 'search_result_' + index } >
                  <Card card_type = 'img-txt' house = { house } />
                </Col>
              )
            })}
          </Row>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
