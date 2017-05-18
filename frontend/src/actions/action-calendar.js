import * as types from '../actions/action-types';

export const setDateArrival = dateArrival => ({ type: types.SET_DATE_ARRIVAL, dateArrival })

export const setDateDeparture = dateDeparture => ({ type: types.SET_DATE_DEPARTURE, dateDeparture })

export const resetAllCalendarData = () => ({ type: types.RESET_ALL_CALENDAR_DATE, reset: null })
