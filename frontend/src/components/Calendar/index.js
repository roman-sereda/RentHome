import React, { Component } from 'react'
import styles from './styles.css'

import ReactDOM from 'react-dom'

import store from '../../store';

import { connect }             from 'react-redux';

import { setNameOfMonth,
         setDate,
         setCalendar } from '../../actions/action-calendar';

import CalendarForm from './CalendarForm'

class Calendar extends Component{

  componentWillMount(){
    this.nameOfMonth = [
    "Січень", "Лютий", "Березень",
    "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень",
    "Жовтень", "Листопад", "Грудень"]

    this.currentDate = new Date()
    this.currentDate.setHours(0, 0, 0, 0);

    this.setCurrentDate()

    this.updateCalendar()
  }

  setCurrentDate(){
    this.Year = this.currentDate.getFullYear()
    this.Month = this.currentDate.getMonth()
    this.Day = this.currentDate.getDate()
  }

  updateCalendar(){
    store.dispatch(setNameOfMonth(this.nameOfMonth[this.Month]))
    store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
    store.dispatch(setCalendar(this.renderCalendar()))
  }

  templateDate(day, month, year){
    return(day + '-' + (month + 1) + '-' + year)
  }

  changeMonth({numberDay, state, countDay}){

    this.Day = numberDay

    if (state == "prev" || Number(numberDay) > Number(countDay)){
      this.Month -= 1
    }
    else if (state == "next" || Number(numberDay + this.startMonth) < Number(countDay)){
      this.Month += 1

      if (this.Month > 11) {
        this.Month = 0
        this.Year += 1
      }
    }

    let requestedDate = new Date(this.Year, this.Month, this.Day)

    if (requestedDate >= this.currentDate){
      this.updateCalendar()
    }
    else{
      this.setCurrentDate()

      this.updateCalendar()
    }
  }

  renderCalendar() {

   let  startMonth = new Date(this.Year, this.Month, 1).getUTCDay(),
        countDay = 0,
        countWeek = 5,
        dayCountInThisMonth = new Date(this.Year, this.Month + 1, 0).getDate(),
        dayCountInPrevMonth = new Date(this.Year, this.Month, 0).getDate(),
        numberDay = dayCountInPrevMonth - startMonth,
        prevMonthEnd = false,
        thisMonthEnd = false

    this.day = []
    this.week = []
    this.startMonth = startMonth

    for(let week = 1; week <= countWeek; week++){
      for(let day = 1; day <= 7; day++){

        numberDay++

        countDay++

        if (numberDay > dayCountInPrevMonth && prevMonthEnd == false){
          numberDay = 1
          prevMonthEnd = true
        }
        else if (numberDay > dayCountInThisMonth && prevMonthEnd == true){
          numberDay = 1
          thisMonthEnd = true
        }

        if (week == 5 && day == 7 && thisMonthEnd == false){
          countWeek = 6
        }

        this.day.push(<td key={'dayCalendar ' + countDay}
                          data-NumberDay={numberDay}
                          data-countDay={countDay}
                          onClick={(e) => this.changeMonth({numberDay: e.target.getAttribute("data-NumberDay"),
                                                            countDay:  e.target.getAttribute("data-countDay")})}
                      >{numberDay}</td>)
      }
      this.week.push(<tr key={'weekCalendar ' + week}>{this.day}</tr>)
      this.day = []
    }
    return(this.week)
  }

  render(){
    return(
      <div>
        <CalendarForm date={this.props.date}
                      changeMonth={this.changeMonth.bind(this)}
                      NameOfMonth={this.props.nameOfMonth}
                      Calendar={this.props.calendarBody} />
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    date: store.calendar.date,
    nameOfMonth: store.calendar.nameOfMonth,
    calendarBody: store.calendar.calendarBody
  };
};

export default connect(mapStateToProps)(Calendar);
