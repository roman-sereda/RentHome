import { combineReducers } from 'redux'

import user from './user-reducer'
import houses from './houses'
import house from './house'
import calendar from './calendar-reducer'


var reducers = combineReducers({
    user,
    calendar,
    houses,
    house
});

export default reducers
