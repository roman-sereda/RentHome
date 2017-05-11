import React, { Component } from 'react'
import styles from './styles.css'

const week_days = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд' ]

export default class CalendarForm extends Component{

  openCalendar() {
    this.refs.content.className = this.refs.content.className ==
      'show-dropdown-content' ?
        'hide-dropdown-content' :
        'show-dropdown-content'
  }

  render(){
    return(
      <span>
        <button onClick={() => this.openCalendar()} className="calendar-field" >
          <div className = 'calendar-field-left-part'> {this.props.date} </div>
          <div className = 'calendar-field-right-part'> &#9475; &#9650; </div>
        </button>
        <div id='myDropdown' className='show-dropdown-content' ref='content'>
          <div className = 'dropdown-header' >
            <span className = 'calendar-header-cell calendar-arrow blue-text' onClick={() => this.props.changeMonth({state: "prev"})} >&#9664; </span>
            <span className = 'calendar-header-cell'><h2 className = 'blue-text'> {this.props.NameOfMonth} </h2></span>
            <span className = 'calendar-header-cell calendar-arrow blue-text' onClick={() => this.props.changeMonth({state: "next"})} >&#9654; </span>
          </div>
          <div className = 'calendar' >
              <span className = 'calendar-row calendar-week-days'>
                { week_days.map((day) => {
                  return(
                    <span key = { day } className = 'calendar-cell'>
                      { day == 'Нд' ? <span className = 'red-text'>{day}</span> : day}
                    </span>
                  )
                })}
              </span>
                {this.props.Calendar}
          </div>
        </div>
      </span>
    )
  }
}
