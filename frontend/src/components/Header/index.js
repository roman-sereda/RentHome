import React, { Component } from 'react'
import styles from './styles.css'

import Button from '../Button'
import MainHeader from './MainHeader'
import MobileHeader from './MobileHeader'

const links = [
  ['Довготермінова оренда', '/#'],
  ['Квартири подобово', '/#'],
  ['Зняти квартиру', '/#'],
  ['Зняти кімнату', '/#']
]

const header_props = {
  links: links,
}

export default class Header extends Component{

  isMobile(){
    console.log('ok')
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       return true
    }
    return false
  }

  render(){
    console.log('fuck you')
    return(
       this.isMobile() ?
        <MobileHeader {...header_props} /> :
        <MainHeader {...header_props} />
    )
  }
}
