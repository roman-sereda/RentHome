import React, { Component } from 'react'

import styles       from './styles.css'

import CalendarForm from './CalendarForm'

import { connect }  from 'react-redux';

export default class Calendar extends Component{

  constructor() {
    super();
    this.state = { date: null,
                   nameOfMonth: null,
                   calendarBody: null };
 }

  componentWillMount(){
    this.nameOfMonth = [
    "Січень", "Лютий", "Березень",
    "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень",
    "Жовтень", "Листопад", "Грудень"]

    this.currentDate = new Date()
    this.currentDate.setHours(0, 0, 0, 0);

    this.setTodayDate()

    this.updateCalendarData()

    this.setState({
        calendarBody: this.renderCalendar([null])
    })
  }

  setTodayDate(){
    this.Year = this.currentDate.getFullYear()
    this.Month = this.currentDate.getMonth()
    this.Day = this.currentDate.getDate()
  }

  updateCalendarData(){
    this.setState({
        nameOfMonth: this.nameOfMonth[this.Month],
        date: this.templateDate(this.Day, this.Month, this.Year)
    })
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
      this.setState({
          calendarBody: this.renderCalendar([null])
      })
    }
    else if (state == "next" || (Number(numberDay) + Number(this.startMonth)) < Number(countDay)){
      this.Month += 1
      if (this.Month > 11) {
        this.Month = 0
        this.Year += 1
      }
      this.setState({
          calendarBody: this.renderCalendar([null])
      })
    }

    let requestedDate = new Date(this.Year, this.Month, this.Day)

    if (requestedDate >= this.currentDate){
      this.updateCalendarData()
    }
    else{
      this.setTodayDate()

      this.updateCalendarData()
    }
  }

  setColor(numberDay, thisMonthEnd, selectedDate, id) {
    if (selectedDate == id){
      return('white')
    }
    else if (this.currentDate > new Date(this.Year, this.Month, numberDay) && thisMonthEnd == false){
      return("gray")
    }else{
      return("black")
    }
  }

  setBackgroundColor(id, selectedDate){
    if (selectedDate == id){
      return('red')
    }
    else {
      return(null)
    }
  }

  renderCalendar(selectedDate) {
    this.startMonth = new Date(this.Year, this.Month, 1).getUTCDay()

   let  countDay = 0,
        countWeek = 5,
        dayCountInThisMonth = new Date(this.Year, this.Month + 1, 0).getDate(),
        dayCountInPrevMonth = new Date(this.Year, this.Month, 0).getDate(),
        numberDay = dayCountInPrevMonth - this.startMonth,
        numberMonth = this.Month-1 ,
        prevMonthEnd = false,
        thisMonthEnd = false,
        unavailableDay = true

    this.tdDay = []
    this.trWeek = []


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

        if (this.currentDate < new Date(this.Year, this.Month, numberDay)){
          unavailableDay = false
        }

        if (week == 5 && day == 7 && thisMonthEnd == false){
          countWeek = 6
        }

        this.tdDay.push(<span className = 'calendar-cell'><span className = 'day-wrapper' key={'dayCalendar ' + countDay}
                          data-NumberDay={numberDay}
                          data-countDay={countDay}
                          data-unavailableDay={unavailableDay}
                          id={this.templateDate(numberDay, numberMonth, this.Year)}

                          style={{ color: this.setColor(numberDay, thisMonthEnd, selectedDate, this.templateDate(numberDay, numberMonth, this.Year)), borderRadius: '25px',
                                   backgroundColor: this.setBackgroundColor(this.templateDate(numberDay, numberMonth, this.Year), selectedDate)
                                }}

                          onClick={(e) => {
                            if (e.target.getAttribute("data-unavailableDay") !== 'true') {

                              this.changeMonth({numberDay: e.target.getAttribute("data-NumberDay"),
                                                countDay:  e.target.getAttribute("data-countDay")})

                              this.setState({
                                  calendarBody: this.renderCalendar(e.target.getAttribute("id"))
                              })
                            }}}

                        >{numberDay}</span></span>)
      }

      this.trWeek.push(<tr key={'weekCalendar ' + week}>{this.tdDay}</tr>)
      this.tdDay = []
    }
    return(this.trWeek)
  }

  render(){
    return(
      <div>
        <CalendarForm date={this.state.date}
                      changeMonth={this.changeMonth.bind(this)}
                      NameOfMonth={this.state.nameOfMonth}
                      Calendar={this.state.calendarBody} />
      </div>
    )
  }
}
