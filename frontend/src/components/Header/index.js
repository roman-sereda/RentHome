import React, { Component } from 'react'
import styles from './styles.css'

import Button from '../Button'
import MainHeader from './MainHeader'
import MobileHeader from './MobileHeader'
import Auth from '../Auth'

const links = [
  ['Довготермінова оренда', '/#'],
  ['Квартири подобово', '/#'],
  ['Зняти квартиру', '/#'],
  ['Зняти кімнату', '/#']
]

export default class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      popup: false,
      moveTo: 'signin'
    }
  }

  isMobile(){
    console.log('ok')
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       return true
    }
    return false
  }

  showAuthPopup(nextPage){
    this.setState({ popup: true, moveTo: nextPage })
    console.log(this.state.nextPage)
  }

  hideAuthPopup(){
    this.setState({ popup: false })
  }

  render(){
    const header_props = {
      links: links,
      showAuthPopup: ( nextPage ) => this.showAuthPopup( nextPage ),
      hideAuthPopup: () => this.hideAuthPopup(),
      currentPage: this.state.moveTo
    }
    return(
      <span>
        { this.state.popup ?
          <Auth {...header_props}  /> :
          null
        }
       { this.isMobile() ?
        <MobileHeader {...header_props} /> :
        <MainHeader {...header_props} /> }
      </span>
    )
  }
}
