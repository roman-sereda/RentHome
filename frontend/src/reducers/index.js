import { combineReducers } from 'redux'

import someReducers from './somePath'


var reducers = combineReducers({
    someState:      someReducers,
});

export default reducers
