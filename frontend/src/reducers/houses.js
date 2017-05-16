import * as types from '../actions/action-types'

export default function( state = { isFetching: false, data: [], errors: []}, action ){

  switch(action.type){
    case types.RECEIVE_HOUSES_REQUEST:
      return Object.assign( {}, state, { isFetching: true } )

    case types.RECEIVE_HOUSES_SUCCESS:
      return Object.assign( {}, state, { data: action.houses, isFetching: false} )

    case types.RECEIVE_HOUSES_FAILURE:
        return Object.assign( {}, state, { errors: action.errors, isFetching: false} )

    default:
      return state
    }
}
