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

import { resetAllCalendarData } from '../../src/actions/action-calendar'

const mockStore = configureMockStore([ thunk ]);

const todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0);

const fakeDateArrival = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 10, 0, 0, 0, 0);

const emptyStoreMock = {
  calendar:{
    dateArrival: null,
    dateOfDeparture: null
  }
}

const storeMockWithFakeDateArrival = {
  calendar:{
    dateArrival: fakeDateArrival,
    dateOfDeparture: null
  }
}

const correctFistNumberDay = (dayCountInPrevMonth, startMonth) => {
  const numberDay = dayCountInPrevMonth - startMonth + 1

  if (numberDay >= dayCountInPrevMonth) {
    return (1)
  }
  else{
    return (numberDay)
  }
}

const unavailableDays = (Mount) => {
  return (Mount.findWhere(Day => Day.props()['data-unavailableDay'] == true))
}

const findTodayCalendarElement = (Mount) => {
  return (Mount.findWhere(Day => Day.props()['data-NumberDay'] == todaysNumber))
}

const ArrivalCalendarMount   = mount(<Calendar type='Arrival'   store={mockStore(emptyStoreMock)} />, document.body)

const DepartureCalendarWithMockStoreMount = mount(<Calendar type='Departure' store={mockStore(storeMockWithFakeDateArrival)} />, document.body)

const DepartureCalendarWithEmptyMockStoreMount = mount(<Calendar type='Departure' store={mockStore(emptyStoreMock)} />, document.body)

const todaysNumber = todaysDate.getDate()

const numbernumberDayTheMonthBegins = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1).getUTCDay()

const dayCountInPrevMonth = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 0).getDate()


describe('<Calendar /> should', () => {

  it('Calendar render itself', () => {
    expect(ArrivalCalendarMount.length).to.equal(1)
  })

  it('Calendar render correct count days', () => {
    const dayCountInThisMonth = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0).getDate()

    let expectNumberOfDays = 35

    if (dayCountInThisMonth + numberDayTheMonthBegins > 35){
      expectNumberOfDays = 42
    }

    expect(ArrivalCalendarMount.find('.day-wrapper').length).to.equal(expectNumberOfDays)
  })

  it('Calendar start with correct day', () => {
    expect(ArrivalCalendarMount.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(correctFistNumberDay(dayCountInPrevMonth, numberDayTheMonthBegins))
  })

  it('Calendar end with correct day', () => {
    const lastDayInCalendar = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), ArrivalCalendarMount.find('.day-wrapper').length).getDate()

    expect(ArrivalCalendarMount.find('.day-wrapper').last().props()['data-NumberDay']).to.equal(lastDayInCalendar)
  })

  it('Calendar arrival have correct number unavailable days', () => {
    expect(unavailableDays(ArrivalCalendarMount).length).to.equal(todaysNumber - 1 + numberDayTheMonthBegins)
  })

  it('Calendar departure have correct number unavailable days with props dateArrival', () => {
    expect(unavailableDays(DepartureCalendarWithMockStoreMount).length).to.equal(fakeDateArrival.getDate() - 1 + numberDayTheMonthBegins)
  })

  it('Calendar departure have correct number unavailable days without props dateArrival', () => {
    expect(unavailableDays(DepartureCalendarWithEmptyMockStoreMount).length).to.equal(todaysNumber - 1 + numberDayTheMonthBegins)
  })

  it('Calendar change color available date when i click on date', () => {
    const TodayCalendarElement = findTodayCalendarElement(ArrivalCalendarMount).first().simulate('click')

    expect(TodayCalendarElement.first().props().style.color).to.equal('white')
    expect(TodayCalendarElement.first().props().style.backgroundColor).to.equal('red')
  })

  it('Calendar dont change color unavailable date when i click on date', () => {
    const TodayCalendarElement = findTodayCalendarElement(DepartureCalendarWithMockStoreMount).first().simulate('click')

    expect(TodayCalendarElement.first().props().style.color).to.equal('gray')
  })

  describe('test with real store', () => {
    const CalendarArrivalWithRealStore  = mount(<Calendar type='Arrival'   store={realStore} />, document.body)

    const CalendarDepartureWithRealStore  = mount(<Calendar type='Departure'   store={realStore} />, document.body)

    beforeEach(function() {
      realStore.dispatch(resetAllCalendarData())
    });

    it('see prev month', () => {
      const NextMonthCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['className'] == 'calendar-header-cell calendar-arrow blue-text').last()
      const PreviousMonthCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['className'] == 'calendar-header-cell calendar-arrow blue-text').first()

      NextMonthCalendarElement.simulate('click')
      PreviousMonthCalendarElement.simulate('click')

      expect(CalendarDepartureWithRealStore.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(correctFistNumberDay(dayCountInPrevMonth, numberDayTheMonthBegins))
    })

    it('see next month', () => {
      const NextMonthCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['className'] == 'calendar-header-cell calendar-arrow blue-text').last()

      NextMonthCalendarElement.simulate('click')

      const startMonth = new Date(todaysDate.getFullYear(), todaysDate.getMonth()+1, 1).getUTCDay()
      const dayCountInPrevMonth = new Date(todaysDate.getFullYear(), todaysDate.getMonth()+1, 0).getDate()

      expect(CalendarDepartureWithRealStore.find('.day-wrapper').first().props()['data-NumberDay']).to.equal(correctFistNumberDay(dayCountInPrevMonth, startMonth))
    })

    it('when i click on date on calendar arrival i set props dateArrival', () => {
      findTodayCalendarElement(CalendarArrivalWithRealStore).first().simulate('click')

      expect(CalendarArrivalWithRealStore.props().store.getState().calendar.dateArrival.getDate()).to.equal(todaysDate.getDate())
    })

    it('when i click on date on calendar departure i set props dateOfDeparture', () => {
      const TodayCalendarElement = CalendarDepartureWithRealStore.findWhere(Day => Day.props()['data-NumberDay'] == todaysNumber + 10)

      TodayCalendarElement.first().simulate('click')

      expect(CalendarArrivalWithRealStore.props().store.getState().calendar.dateOfDeparture.getDate()).to.equal(todaysDate.getDate() + 10)
    })
  })
})
