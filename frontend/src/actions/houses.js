import * as types from '../actions/action-types';
import axios from 'axios'

export function getHouses( filters ){
  return dispatch => {
    dispatch(getHousesRequest())
    return axios.get('/houses/search', { filters: filters })
      .then(response => dispatch(getHousesSuccess( response.data.houses )))
      .catch(ex => dispatch(getHousesFailure( ex.response.data.errors )))
}}

export const getHousesRequest = () => ({ type: types.RECEIVE_HOUSES_REQUEST })
export const getHousesSuccess = houses => ({ type: types.RECEIVE_HOUSES_SUCCESS, houses: houses })
export const getHousesFailure = ex => ({ type: types.RECEIVE_HOUSES_FAILURE, ex })
