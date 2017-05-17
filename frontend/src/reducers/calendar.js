import * as types from '../actions/action-types';


const initialState = {
  dateArrival: null,
  dateOfDeparture: null
}

const calendar = function(state = initialState, action) {

  switch(action.type) {

    case types.SET_DATE_ARRIVAL:
      return Object.assign({}, state, { dateArrival: action.dateArrival });

    case types.SET_DATE_DEPARTURE:
      return Object.assign({}, state, { dateOfDeparture: action.dateDeparture });

    case types.RESET_ALL_CALENDAR_DATE:
      return Object.assign({}, state, { dateArrival: action.reset,
                                        dateOfDeparture: action.reset });
    }
  return state;
}

export default calendar;
