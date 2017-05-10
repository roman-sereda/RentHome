import * as types from '../actions/action-types';


const initialState = {}

const user = function(state = initialState, action) {

  switch(action.type) {

    case types.SOME_ACTION_TYPE:
      return Object.assign({}, state, action.user);
    }
  return state;
}

export default user;
