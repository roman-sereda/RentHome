import React, { Component } from 'react'
import styles from './styles.css'


export default class CalendarForm extends Component{

  componentWillMount(){
    this.nameOfMonth = {}
    this.nameOfMonth[0] = "Січень"
    this.nameOfMonth[1] = "Лютий"
    this.nameOfMonth[2] = "Березень"
    this.nameOfMonth[3] = "Квітень"
    this.nameOfMonth[4] = "Травень"
    this.nameOfMonth[5] = "Червень"
    this.nameOfMonth[6] = "Липень"
    this.nameOfMonth[7] = "Серпень"
    this.nameOfMonth[8] = "Вересень"
    this.nameOfMonth[9] = "Жовтень"
    this.nameOfMonth[10] = "Листопад"
    this.nameOfMonth[11] = "Грудень"

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
    var currentDate = new Date();
    let startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getUTCDay()

    let numberDay = 31 - startMonth
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
              <h2> {this.nameOfMonth[new Date().getMonth()]} </h2>
            </div>
            <div className="bodyCalendar">
              <table>
                <tbody>
                  <tr>
                    <td>Пн</td>
                    <td>Вт</td>
                    <td>Ср</td>
                    <td>Чт</td>
                    <td>Пт</td>
                    <td>Сб</td>
                    <td>Нд</td>
                  </tr>
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
