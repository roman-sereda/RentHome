import React, { Component } from 'react'
import Calendar from '../Calendar'
import Footer from './../Footer'
import Header from './../Header'

export default class WelcomePage extends Component{
  render(){
    return(
      <span>
        <Header />
        <Calendar />
        <Footer />
      </span>
    )
  }
}
