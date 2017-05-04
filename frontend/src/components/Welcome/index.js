import React, { Component } from 'react'

import Footer from './../Footer'
import Header from './../Header'
import Card from './../Card'

export default class WelcomePage extends Component{
  render(){
    return(
      <span>
        <Header />
        <Card />
        <Footer />
      </span>
    )
  }
}
