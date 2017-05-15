import * as types from '../actions/action-types';
import axios from 'axios'

export function getHouse( id ){
  return dispatch => {
    dispatch(getHouseRequest())
    return axios.get('/houses/' + id)
      .then(response => dispatch(getHouseSuccess( response.data.house )))
      .catch(error => dispatch(getHouseFailure( response.data.errors )))
}}

export const getHouseRequest = () => ({ type: types.RECEIVE_HOUSE_REQUEST })
export const getHouseSuccess = house => ({ type: types.RECEIVE_HOUSE_SUCCESS, house: house })
export const getHouseFailure = errors => ({ type: types.RECEIVE_HOUSE_FAILURE, errors })
