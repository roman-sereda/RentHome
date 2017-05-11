import React, { Component } from 'react'

import styles       from './styles.css'

import store        from '../../store'

import CalendarForm from './CalendarForm'

import { connect }  from 'react-redux';

import { setDateArrival,
         setDateDeparture } from '../../actions/action-calendar'

class Calendar extends Component{

  constructor() {
    super();
    this.state = { nameOfMonth: null,
                   calendarBody: null,
                   choisedDate: null};
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

    let PleaseChoiseDate

    if (this.props.type == "Arrival") {
      PleaseChoiseDate = "Виберіть дату заїзду"
    }else{
      PleaseChoiseDate = "Виберіть дату виїзду"
    }

    this.setState({
        nameOfMonth: this.nameOfMonth[this.Month],
        choisedDate: PleaseChoiseDate
    })

    store.dispatch(setDateArrival(new Date(this.Year, this.Month, this.Day)))

    this.setState({
        calendarBody: this.renderCalendar({selectedDate: [null]})
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dateArrival !== nextProps.dateArrival && this.props.type == "Departure") {

      let rightDate,
          rightSelectedDate

      if(nextProps.dateOfDeparture >= nextProps.dateArrival) {
        rightSelectedDate = this.state.choisedDate
        rightDate = this.state.choisedDate
      }else{
        rightDate = "Виберіть дату виїзду"
        store.dispatch(setDateDeparture(null))
      }

      this.setState({
          choisedDate: rightDate,
          calendarBody: this.renderCalendar({selectedDate: rightDate,
                                             dateArrival: nextProps.dateArrival})
      })
    }
  }

  setTodayDate(){
    this.Year = this.currentDate.getFullYear()
    this.Month = this.currentDate.getMonth()
    this.Day = this.currentDate.getDate()
  }

  templateDate(day, month, year){
    return(day + '-' + (Number(month) + 1) + '-' + year)
  }

  changeMonth({numberDay=this.Day, state, countDay}){
    this.Day = numberDay

    if (state == "prev" || Number(numberDay) > Number(countDay)){
      this.Month -= 1
      if(this.Month < 0){
        this.Month = 11
        this.Year -= 1
      }
    }
    else if (state == "next" || (Number(numberDay) + Number(this.startMonth)) < Number(countDay)){
      this.Month += 1
      if (this.Month > 11) {
        this.Month = 0
        this.Year += 1
      }
    }

    let requestedDate = new Date(this.Year, this.Month + 1, 0)

    if (requestedDate >= this.currentDate){
      this.setState({
          nameOfMonth: this.nameOfMonth[this.Month],
          date: this.templateDate(this.Day, this.Month, this.Year),
          calendarBody: this.renderCalendar({selectedDate: this.state.choisedDate})
      })
    }
    else{
      this.Month += 1
    }
  }

  setColor(numberDay, thisMonthEnd, selectedDate, id, dateArrival, numberMonth) {
    if (selectedDate == id){
      return('white')
    }
    else if (dateArrival > new Date(this.Year, numberMonth, numberDay) && this.props.type == "Departure"){
      return("gray")
    }
    else if (this.currentDate > new Date(this.Year, numberMonth, numberDay) && thisMonthEnd == false){
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

  renderCalendar({selectedDate, dateArrival=this.props.dateArrival}) {
    this.startMonth = new Date(this.Year, this.Month, 1).getUTCDay()

   let  countDay = 0,
        countWeek = 5,
        dayCountInThisMonth = new Date(this.Year, this.Month + 1, 0).getDate(),
        dayCountInPrevMonth = new Date(this.Year, this.Month, 0).getDate(),
        numberDay = dayCountInPrevMonth - this.startMonth,
        numberMonth = this.Month-1,
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
        if (dateArrival <= new Date(this.Year, numberMonth, numberDay) && this.props.type == "Departure"){
          unavailableDay = false
        }
        else if(this.currentDate <= new Date(this.Year, numberMonth, numberDay) && this.props.type == "Arrival"){
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

                          style={{ color: this.setColor(numberDay, thisMonthEnd, selectedDate, this.templateDate(numberDay, numberMonth, this.Year), dateArrival, numberMonth), borderRadius: '25px',
                                   backgroundColor: this.setBackgroundColor(this.templateDate(numberDay, numberMonth, this.Year), selectedDate)
                                }}

                          onClick={(e) => {
                            if (e.target.getAttribute("data-unavailableDay") !== 'true') {

                              this.changeMonth({numberDay: e.target.getAttribute("data-NumberDay"),
                                                countDay:  e.target.getAttribute("data-countDay")})

                              this.setState({
                                  choisedDate: e.target.getAttribute("id"),
                                  calendarBody: this.renderCalendar({selectedDate: e.target.getAttribute("id")})
                              })
                              if (this.props.type == "Arrival") {
                                store.dispatch(setDateArrival(new Date(this.Year, this.Month, e.target.getAttribute("data-NumberDay"))))
                              }else{
                                store.dispatch(setDateDeparture(new Date(this.Year, this.Month, e.target.getAttribute("data-NumberDay"))))
                              }
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
        <CalendarForm date={this.state.choisedDate}
                      changeMonth={this.changeMonth.bind(this)}
                      NameOfMonth={this.state.nameOfMonth}
                      Calendar={this.state.calendarBody} />
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    dateArrival: store.calendar.dateArrival,
    dateOfDeparture: store.calendar.dateOfDeparture
  };
};

export default connect(mapStateToProps)(Calendar);
