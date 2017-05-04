import React, { Component } from 'react'

import { Link } from 'react-router';

export default class WelcomePage extends Component{
  render(){
    return(
      <div>
        <span>Temp</span>

        <Link to={'/auth'}>Auth</Link>

        {this.props.children}
      </div>
    )
  }
}
