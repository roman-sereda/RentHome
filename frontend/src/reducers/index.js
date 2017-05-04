import { combineReducers } from 'redux'

import userReducer from './user-reducer'


var reducers = combineReducers({
    userState:      userReducer,
});

export default reducers
