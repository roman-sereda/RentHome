import React, { Component } from 'react'

export default class Input extends Component {

  render () {
    return (
      <button
        className="button"
        onClick={this.props.onClick}>
        Виберіть дату заїзду
      </button>
    )
  }
}
