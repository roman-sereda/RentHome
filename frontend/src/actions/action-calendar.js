import * as types from '../actions/action-types';

export function setNameOfMonth(name) {
  return {
    type: types.SET_NAME_OF_MONTH,
    name
  };
}

export function setDate(date) {
  return {
    type: types.SET_DATE,
    date
  };
}

export function setCalendar(calendar) {
  return {
    type: types.SET_CALENDAR_BODY,
    calendar
  }
}

export function setSelectedDate(selectedDate) {
  return {
    type: types.SET_SELECTED_DATE,
    selectedDate
  }
}

export function resetAllCalendarData() {
  return {
    type: types.RESET_ALL_CALENDAR_DATA,
    reset: [null]
  }
}
