import React, { Component } from 'react'
import styles from './styles.css'

export default class Button extends Component{
  render(){
    return(
      <div className = 'button'>
        { this.props.label }
      </div>
    )
  }
}
