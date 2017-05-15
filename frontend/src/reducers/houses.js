import * as types from '../actions/action-types'

export default function( state = {}, action ){

  switch(action.type){
    case types.RECEIVE_HOUSES_REQUEST:
      return Object.assign( {}, state )

    case types.RECEIVE_HOUSES_SUCCESS:
      return Object.assign( {}, state, action.houses )

    case types.RECEIVE_HOUSES_FAILURE:
        return Object.assign( {}, state, action.errors )

    default:
      return state
    }
}
