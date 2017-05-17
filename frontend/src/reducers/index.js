import { combineReducers } from 'redux'

import user from './user'
import houses from './houses'
import house from './house'
import calendar from './calendar'


var reducers = combineReducers({
    user,
    calendar,
    houses,
    house
});

export default reducers
