import * as types from '../actions/action-types';


const initialState = {
  nameOfMonth: [null],
  date: [null],
  calendarBody: [null],
  selectedDate: [null]
}

const user = function(state = initialState, action) {

  switch(action.type) {

    case types.SET_NAME_OF_MONTH:
      return Object.assign({}, state, { nameOfMonth: action.name });

    case types.SET_DATE:
      return Object.assign({}, state, { date: action.date });

    case types.SET_SELECTED_DATE:
      return Object.assign({}, state, { selectedDate: action.selectedDate });

    case types.SET_CALENDAR_BODY:
      return Object.assign({}, state, { calendarBody: action.calendar });

    case types.RESET_ALL_CALENDAR_DATA:
      return Object.assign({}, state, { nameOfMonth: action.reset,
                                        date: action.reset,
                                        calendarBody: action.reset});
    }
  return state;
}

export default user;
