import React, { Component } from 'react'
import styles from './styles.css'

import ReactDOM from 'react-dom'

import store from '../../store';

import { connect }             from 'react-redux';

import { setNameOfMonth,
         setDate,
         setCalendar,
         setSelectedDate } from '../../actions/action-calendar';

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
    store.dispatch(setCalendar(this.renderCalendar(null)))
  }

  setCurrentDate(){
    this.Year = this.currentDate.getFullYear()
    this.Month = this.currentDate.getMonth()
    this.Day = this.currentDate.getDate()
  }

  updateCalendar(){
    store.dispatch(setNameOfMonth(this.nameOfMonth[this.Month]))
    store.dispatch(setDate(this.templateDate(this.Day, this.Month, this.Year)))
  }

  templateDate(day, month, year){
    return(day + '-' + (Number(month) + 1) + '-' + year)
  }

  changeMonth({numberDay, state, countDay}){
    this.Day = numberDay

    if (state == "prev" || Number(numberDay) > Number(countDay)){
      this.Month -= 1

      if(this.Month < 0){
        this.Month = 11
        this.Year -= 1
      }
      store.dispatch(setSelectedDate([null]))
    }
    else if (state == "next" || (Number(numberDay) + Number(this.startMonth)) < Number(countDay)){
      this.Month += 1

      if (this.Month > 11) {
        this.Month = 0
        this.Year += 1
      }
      store.dispatch(setSelectedDate([null]))
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

  setColor(numberDay, thisMonthEnd) {
    if (this.currentDate > new Date(this.Year, this.Month, numberDay) && thisMonthEnd == false){
      return("gray")
    }else{
      return("black")
    }
  }

  renderCalendar(propsSelectedDate) {

   let  startMonth = new Date(this.Year, this.Month, 1).getUTCDay(),
        countDay = 0,
        countWeek = 5,
        dayCountInThisMonth = new Date(this.Year, this.Month + 1, 0).getDate(),
        dayCountInPrevMonth = new Date(this.Year, this.Month, 0).getDate(),
        numberDay = dayCountInPrevMonth - startMonth,
        numberMonth = this.Month-1 ,
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
          numberMonth += 1
          prevMonthEnd = true
        }
        else if (numberDay > dayCountInThisMonth && prevMonthEnd == true){
          numberDay = 1
          numberMonth += 1
          thisMonthEnd = true
        }

        if (week == 5 && day == 7 && thisMonthEnd == false){
          countWeek = 6
        }

        this.day.push(<td key={'dayCalendar ' + countDay}
                          data-NumberDay={numberDay}
                          data-countDay={countDay}
                          className={this.templateDate(numberDay, numberMonth, this.Year)}
                          id={this.templateDate(numberDay, numberMonth, this.Year)}

                          style={{color: this.setColor(numberDay, thisMonthEnd), backgroundColor: this.testFunctionChangeColor(this.templateDate(numberDay, numberMonth, this.Year), propsSelectedDate)}}
                          onClick={(e) => { this.changeMonth({numberDay: e.target.getAttribute("data-NumberDay"),
                                                      countDay:  e.target.getAttribute("data-countDay")})

                                            store.dispatch(setSelectedDate(e.target.getAttribute("id")))
                                          }
                                    }
                      >{numberDay}</td>)
      }
      this.week.push(<tr key={'weekCalendar ' + week}>{this.day}</tr>)
      this.day = []
    }
    return(this.week)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDate !== nextProps.selectedDate) {
      store.dispatch(setCalendar(this.renderCalendar(nextProps.selectedDate)))
    }
  }

  testFunctionChangeColor(id, propsSelectedDate){
    if (propsSelectedDate == id){
      return('red')
    }
    else {
      return(null)
    }
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
    calendarBody: store.calendar.calendarBody,
    selectedDate: store.calendar.selectedDate
  };
};

export default connect(mapStateToProps)(Calendar);
