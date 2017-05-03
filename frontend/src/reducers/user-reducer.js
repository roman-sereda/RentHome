import * as types from '../actions/action-types';


const initialState = {
  user: [null]
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.SOME_ACTION_TYPE:
      return Object.assign({}, state, { user: action.user });
    }
  return state;
}

export default userReducer;
