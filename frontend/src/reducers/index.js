import { combineReducers } from 'redux'

import user from './user-reducer'
import calendar from './calendar-reducer'


var reducers = combineReducers({
    user,
    calendar
});

export default reducers
