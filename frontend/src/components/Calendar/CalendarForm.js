import React, { Component } from 'react'
import styles from './styles.css'


export default class CalendarForm extends Component{

  componentWillMount(){
    this.renderCalendar()
  }

  openCalendar() {
    if (this.refs.content.className !== 'show') {
      this.refs.content.className = 'show'
    }
    else {
      this.refs.content.className = 'dropdown-content'
      }
  }

  renderCalendar() {
    let numberDay = 0
    this.day = []
    this.week = []
    this.Calendar = []
      for(let week = 1; week < 6; week++){
        for(let day = 1; day < 8; day++){
          numberDay++
          if (numberDay > 31){
            numberDay = 1
          }
          this.day.push(<td key={'dayCalendar ' + numberDay}>{numberDay}</td>)
        }
        this.week.push(<tr>{this.day}</tr>)
        this.day = []
      }
      this.Calendar.push(this.week);
  }

  render(){

    return(
      <div>
        <h1>Calendar</h1>
        <div className="dropdown">
          <button onClick={() => this.openCalendar()} className="dropbtn">Calendar</button>
          <div id='myDropdown' className='dropdown-content' ref='content'>
            <div className="monthCalendar">
              <h2> Month </h2>
            </div>
            <div className="bodyCalendar">
              <table>
                <tbody>
                  {this.Calendar}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
