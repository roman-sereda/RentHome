import reducer from '../../src/reducers/houses'
import { expect } from 'chai'
import * as types from '../../src/actions/action-types.js'

describe('Houses reducer ', () => {

  const houses = ['house1', 'house2']
  const errors = ['error1', 'error2']

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(
      {
        isFetching: false,
        data: [],
        errors: []
      }
    )
  })

  it('should change isFetching to true, calling RECEIVE_HOUSES_REQUEST', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSES_REQUEST })).to.deep.equal(
      {
        isFetching: true
      }
    )
  })

  it('should receive houses, calling RECEIVE_HOUSES_SUCCESS', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSES_SUCCESS, houses })).to.deep.equal(
      {
        isFetching: false,
        data: ['house1', 'house2']
      }
    )
  })

  it('should receive errors, calling RECEIVE_HOUSES_FAILURE', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSES_FAILURE, errors })).to.deep.equal(
      {
        isFetching: false,
        errors: ['error1', 'error2']
      }
    )
  })
})
