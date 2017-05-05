import React, { Component } from 'react'
import styles from './styles.css'

export default class Button extends Component{
  render(){
    const propsToStyle = this.props.white ? { opacity: 0.8 } : null
    return(
      <div className = 'button' style = { propsToStyle } >
        { this.props.label }
      </div>
    )
  }
}
