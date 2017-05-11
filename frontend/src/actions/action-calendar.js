import * as types from '../actions/action-types';

export function setDateArrival(dateArrival) {
  return {
    type: types.SET_DATE_ARRIVAL,
    dateArrival
  };
}

export function setDateDeparture(dateDeparture) {
  return {
    type: types.SET_DATE_DEPARTURE,
    dateDeparture
  }
}

export function resetAllCalendarData() {
  return {
    type: types.RESET_ALL_CALENDAR_DATA,
    reset: null
  }
}
