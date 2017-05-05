import React, { Component } from 'react'
import Slider from 'react-slick'
import styles from './styles.css'

const carousel_conf = {
  infinite: true,
  speed: 500,
  draggable: false,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default class Carousel extends Component{
  render(){
    return(
      <span className = 'carousel-wrapper'>
        <Slider {...carousel_conf} >
          <span className = 'carousel-image-wrapper'>
            <img className = 'carousel-image' src = 'https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg' className = 'carousel-image' />
          </span>
          <span className = 'carousel-image-wrapper'>
            <img className = 'carousel-image' src = 'https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg' className = 'carousel-image' />
          </span>
          <span className = 'carousel-image-wrapper'>
            <img className = 'carousel-image' src = 'https://static1.comicvine.com/uploads/original/11128/111283068/5260519-franku+%28kys%29.jpg' className = 'carousel-image' />
          </span>
        </Slider>
        <div className = 'wave1'></div>
      </span>
    )
  }
}
