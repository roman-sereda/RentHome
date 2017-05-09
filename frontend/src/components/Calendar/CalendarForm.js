import React, { Component } from 'react'
import styles from './styles.css'


export default class CalendarForm extends Component{

  openCalendar() {
    if (this.refs.content.className !== 'show') {
      this.refs.content.className = 'show'
    }
    else {
      this.refs.content.className = 'dropdown-content'
      }
  }

  render(){
    return(
      <div>
        <h1>Calendar</h1>
        <div>
          <input value={this.props.date} />
        </div>
        <div className="dropdown">
          <button onClick={() => this.openCalendar()} className="dropbtn">Calendar</button>
          <div id='myDropdown' className='dropdown-content' ref='content'>
            <div className="monthCalendar">
            <table>
              <tbody>
                <tr>
                  <td onClick={() => this.props.changeMonth({numberDay: 1, state: "prev"})}>&#11013;</td>
                  <td><h2> {this.props.NameOfMonth} </h2></td>
                  <td onClick={() => this.props.changeMonth({numberDay: 1, state: "next"})}>&#10145;</td>
                </tr>
              </tbody>
            </table>

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
                  {this.props.Calendar}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
