import { combineReducers } from 'redux'

import user from './user-reducer'
import houses from './houses'
import calendar from './calendar-reducer'


var reducers = combineReducers({
    user,
    calendar,
    houses
});

export default reducers
