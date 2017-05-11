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

    this.todayDate = new Date()
    this.todayDate.setHours(0, 0, 0, 0);

    this.SplitTheTodayDateIntoParts()

    this.setInitialPleas()

    this.setNameOfMonth(this.Month)

    store.dispatch(setDateArrival(new Date(this.Year, this.Month, this.Day)))

    this.setCalendarBody({selectedDate: [null]})

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dateArrival !== nextProps.dateArrival && this.props.type == "Departure") {

      let rightSelectedDate

      if(nextProps.dateOfDeparture >= nextProps.dateArrival) {
        rightSelectedDate = this.state.choisedDate
      }
      else{
        rightSelectedDate = "Виберіть дату виїзду"
        store.dispatch(setDateDeparture(null))
      }

      this.setChoisedDate(rightSelectedDate)

      this.setCalendarBody({ selectedDate: rightSelectedDate,
                             dateArrival:  nextProps.dateArrival })
    }
  }

  setInitialPleas(){
    let PleaseChoiseDate

    if (this.props.type == "Arrival") {
      PleaseChoiseDate = "Виберіть дату заїзду"
    }
    else{
      PleaseChoiseDate = "Виберіть дату виїзду"
    }

    this.setState({
        choisedDate: PleaseChoiseDate
    })
  }

  setPropsDate(date){
    if (this.props.type == "Arrival") {
      store.dispatch(setDateArrival(date))
    }
    else{
      store.dispatch(setDateDeparture(date))
    }
  }

  setNameOfMonth(numberOfMonth){
    this.setState({
        nameOfMonth: this.nameOfMonth[numberOfMonth]
    })
  }

  setCalendarBody({selectedDate, dateArrival}){
    this.setState({
        calendarBody: this.renderCalendar({ selectedDate: selectedDate,
                                            dateArrival:  dateArrival })
    })
  }

  setChoisedDate(choisedDate){
    this.setState({
        choisedDate: choisedDate
    })
  }

  setColor(numberDay, thisMonthEnd, selectedDate, id, dateArrival, numberMonth) {
    if (selectedDate == id){
      return('white')
    }
    else if (dateArrival > new Date(this.Year, numberMonth, numberDay) && this.props.type == "Departure"){
      return("gray")
    }
    else if (this.todayDate > new Date(this.Year, numberMonth, numberDay) && thisMonthEnd == false){
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

  SplitTheTodayDateIntoParts(){
    this.Year = this.todayDate.getFullYear()
    this.Month = this.todayDate.getMonth()
    this.Day = this.todayDate.getDate()
  }

  templateDate(day, month, year){

    month = Number(month) + 1

    if (String(day).length == 1){
      day = String(0) + String(day)
    }

    if (String(month).length  == 1){
      month = String(0) + String(month)
    }

    return(day + '-' + month + '-' + year)
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

    if (requestedDate >= this.todayDate){
      this.setNameOfMonth(this.Month)

      this.setCalendarBody({selectedDate: this.state.choisedDate})
    }
    else{
      this.Month += 1
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
        else if(this.todayDate <= new Date(this.Year, numberMonth, numberDay) && this.props.type == "Arrival"){
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

                          style={{ color: this.setColor( numberDay, thisMonthEnd,
                                                         selectedDate, this.templateDate( numberDay,
                                                                                          numberMonth,
                                                                                          this.Year ),
                                                         dateArrival, numberMonth ),

                                   borderRadius: '25px',

                                   backgroundColor: this.setBackgroundColor( this.templateDate( numberDay,
                                                                                                numberMonth,
                                                                                                this.Year ),
                                                                             selectedDate )
                                }}

                          onClick={(e) => {
                            if (e.target.getAttribute("data-unavailableDay") !== 'true') {

                              this.changeMonth({ numberDay: e.target.getAttribute("data-NumberDay"),
                                                 countDay:  e.target.getAttribute("data-countDay") })

                              this.setChoisedDate(e.target.getAttribute("id"))

                              this.setCalendarBody({ selectedDate:  e.target.getAttribute("id") })

                              this.setPropsDate(new Date(this.Year, this.Month, e.target.getAttribute("data-NumberDay")))

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
