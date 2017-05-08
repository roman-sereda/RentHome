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
    this.currentMonth = this.currentDate.getMonth()

    this.Year = this.currentDate.getFullYear()
    this.Month = this.currentDate.getMonth()
    this.Day = this.currentDate.getDay()

    store.dispatch(setNameOfMonth(this.nameOfMonth[this.currentDate.getMonth()]))
    store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
    store.dispatch(setCalendar(this.renderCalendar()))
  }

  templateDate(day, month, year){
    return(day + '-' + (month + 1) + '-' + year)
  }

  changeDate(Month){
    if (Month < 0){
      this.Month = 11
      this.Year -= 1
    }else if (Month > 11) {
      this.Month = 0
      this.Year += 1
    }
  }

  changeMonth(state){
    this.Day = 1

    if (state == 'next'){
      this.Month += 1
    }else {
      this.Month -= 1
    }

    this.changeDate(this.Month)

    store.dispatch(setNameOfMonth(this.nameOfMonth[this.Month]))
    store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
    store.dispatch(setCalendar(this.renderCalendar()))
  }


  IsThisAnotherMonth(numberDay, countDay){

    if (numberDay > countDay){
      this.Month -= 1
      this.Day = numberDay

      this.changeDate(this.Month)

      store.dispatch(setNameOfMonth(this.nameOfMonth[this.Month]))
      store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
      store.dispatch(setCalendar(this.renderCalendar()))
    }
    else if (numberDay < countDay){
      this.Month += 1
      this.Day = numberDay

      this.changeDate(this.Month)

      store.dispatch(setNameOfMonth(this.nameOfMonth[this.Month]))
      store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
      store.dispatch(setCalendar(this.renderCalendar()))
    }
    else {
      this.Day = numberDay

      store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
    }
  }

  renderCalendar() {

   let  startMonth = new Date(this.Year, this.Month, 1).getUTCDay(),
        numberDay = 31 - startMonth,
        countDay = 0,
        dayCountInMonth = new Date(this.Year, this.Month + 1, 0).getDate()

    this.day = []
    this.week = []

    for(let week = 1; week < 6; week++){
      for(let day = 1; day < 8; day++){

        numberDay++

        if (numberDay > 31){
          numberDay = 1
        }

        countDay++

        this.day.push(<td key={'dayCalendar ' + countDay}
                          data-NumberDay={numberDay}
                          data-countDay={countDay}
                          onClick={(e) => {
                            this.IsThisAnotherMonth(e.target.getAttribute("data-NumberDay"), e.target.getAttribute("data-countDay"))
                          }
                        }>{numberDay}</td>)
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
