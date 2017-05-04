import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Input from './Input'
import './styles.css'

import 'react-datepicker/dist/react-datepicker.css';

export default class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  render() {
    return(
      <DatePicker
        locale="uk"
        customInput={<Input />}
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    )
  }
}
