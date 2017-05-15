import React from 'react'
import sinon from 'sinon'
import simulant from 'simulant'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { render, mount, shallow } from 'enzyme'

import thunk                from 'redux-thunk'
import configureMockStore   from 'redux-mock-store'

import Calendar from '../../src/components/Calendar/index'

import realStore from '../../src/store';

const mockStore = configureMockStore([ thunk ]);

const todayDate = new Date()
todayDate.setHours(0, 0, 0, 0);

const dateArrival = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 10, 0, 0, 0, 0);


const emptyStoreMock = {
  calendar:{
    dateArrival: null,
    dateOfDeparture: null
  }
}

const storeMockWithDateArrival = {
  calendar:{
    dateArrival: dateArrival,
    dateOfDeparture: null
  }
}

const rigthFistNumberDay = (dayCountInPrevMonth, startMonth) => {
  let numberDay = dayCountInPrevMonth - startMonth + 1,
      correctNumberDay

  if (numberDay >= dayCountInPrevMonth) {
    return (1)
  }
  else{
    return (numberDay)
  }
}

describe('<Calendar /> should', () => {

  const ArrivalCalendarMount   = mount(<Calendar type='Arrival'   store={mockStore(emptyStoreMock)} />, document.body)

  const CalendarArrivalWithRealStore  = mount(<Calendar type='Arrival'   store={realStore} />, document.body)

  const CalendarDepartureWithRealStore  = mount(<Calendar type='Departure'   store={realStore} />, document.body)

  const DepartureCalendarWitDateArrivalMount = mount(<Calendar type='Departure' store={mockStore(storeMockWithDateArrival)} />, document.body)

  const DepartureCalendarWitoutDateArrivalMount = mount(<Calendar type='Departure' store={mockStore(emptyStoreMock)} />, document.body)

  const dayDate = todayDate.getDate()

  it('Calendar render itself', () => {
    expect(ArrivalCalendarMount.length).to.equal(1)
  })

  it('Calendar render correct count days', () => {
    const dayCountInThisMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate()

    const startMonthOfWeek = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getUTCDay()

    let expectNumberOfDays = 35

    if (dayCountInThisMonth + startMonthOfWeek > 35){
      expectNumberOfDays = 42
    }

    expect(ArrivalCalendarMount.find('.day-wrapper').length).to.equal(expectNumberOfDays)
  })

  it('Calendar start with correct day', () => {
    const startMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getUTCDay()
    const dayCountInPrevMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate()

    expect(ArrivalCalendarMount.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(rigthFistNumberDay(dayCountInPrevMonth, startMonth))
  })

  it('Calendar end with correct day', () => {
    const lastDayInCalendar = new Date(todayDate.getFullYear(), todayDate.getMonth(), ArrivalCalendarMount.find('.day-wrapper').length).getDate()

    expect(ArrivalCalendarMount.find('.day-wrapper').last().props()['data-NumberDay']).to.equal(lastDayInCalendar)
  })

  it('Calendar arrival have correct number unavailable days', () => {
    const unavailableDays = ArrivalCalendarMount.findWhere(Day => Day.props()['data-unavailableDay'] == true)

    expect(unavailableDays.length).to.equal(dayDate - 1)
  })

  it('Calendar departure have correct number unavailable days with props dateArrival', () => {
    const unavailableDays = DepartureCalendarWitDateArrivalMount.findWhere(Day => Day.props()['data-unavailableDay'] == true)

    expect(unavailableDays.length).to.equal(dateArrival.getDate() - 1)
  })

  it('Calendar departure have correct number unavailable days without props dateArrival', () => {
    const unavailableDays = DepartureCalendarWitoutDateArrivalMount.findWhere(Day => Day.props()['data-unavailableDay'] == true)

    expect(unavailableDays.length).to.equal(dayDate - 1)
  })

  it('Calendar change color date when i click on date', () => {
    const TodayCalendarElement = ArrivalCalendarMount.findWhere(Day => Day.props()['data-NumberDay'] == dayDate)

    TodayCalendarElement.first().simulate('click')

    expect(TodayCalendarElement.first().props().style.color).to.equal('white')
    expect(TodayCalendarElement.first().props().style.backgroundColor).to.equal('red')
  })

  it('Calendar arrival set props arrival when i click on date', () => {
    const TodayCalendarElement = CalendarArrivalWithRealStore.findWhere(Day => Day.props()['data-NumberDay'] == dayDate)

    TodayCalendarElement.first().simulate('click')

    expect(CalendarArrivalWithRealStore.props().store.getState().calendar.dateArrival.getDate()).to.equal(dayDate)
  })

  it('Calendar departure set props departure when i click on date', () => {
    const TodayCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['data-NumberDay'] == dayDate)

    TodayCalendarElement.first().simulate('click')

    expect(CalendarDepartureWithRealStore.props().store.getState().calendar.dateOfDeparture.getDate()).to.equal(dayDate)
  })

  it('see next month', () => {
    const NextMonthCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['className'] == 'calendar-header-cell calendar-arrow blue-text').last()

    NextMonthCalendarElement.simulate('click')

    const startMonth = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 1).getUTCDay()
    const dayCountInPrevMonth = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 0).getDate()


    expect(CalendarDepartureWithRealStore.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(rigthFistNumberDay(dayCountInPrevMonth, startMonth))
  })

  it('see prev month', () => {
    const PreviousMonthCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['className'] == 'calendar-header-cell calendar-arrow blue-text').first()

    PreviousMonthCalendarElement.simulate('click')

    const startMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getUTCDay()
    const dayCountInPrevMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate()

    expect(CalendarDepartureWithRealStore.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(rigthFistNumberDay(dayCountInPrevMonth, startMonth))
  })

})
