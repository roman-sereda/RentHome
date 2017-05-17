import * as types from '../actions/action-types';
import axios from 'axios'

export function getHouses( filters, page ){
  return dispatch => {
    dispatch(getHousesRequest())
    return axios.post('/houses/search', { filters, page} )
      .then(response => dispatch(getHousesSuccess( response.data.houses )))
      .catch(ex => dispatch(getHousesFailure( ex.response.data.errors )))
}}

export const getHousesRequest = () => ({ type: types.RECEIVE_HOUSES_REQUEST })
export const getHousesSuccess = houses => ({ type: types.RECEIVE_HOUSES_SUCCESS, houses: houses })
export const getHousesFailure = ex => ({ type: types.RECEIVE_HOUSES_FAILURE, ex })
