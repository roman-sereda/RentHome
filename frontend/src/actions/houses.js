import * as types from '../actions/action-types';
import axios from 'axios'

export function getHouses( filters ){
  return dispatch => {
    dispatch(getHousesRequest())
    return axios.get('/houses/search', { filters: null })
      .then(response => dispatch(getHousesSuccess( response.data.houses )))
      .catch(error => dispatch(fetchingFailure( response.data.errors )))
}}

export const getHousesRequest = () => ({ type: types.RECEIVE_HOUSES_REQUEST })
export const getHousesSuccess = houses => ({ type: types.RECEIVE_HOUSES_SUCCESS, houses })
export const getHousesFailure = errors => ({ type: types.RECEIVE_HOUSES_FAILURE, errors })
