import reducer from '../../src/reducers/house'
import { expect } from 'chai'
import * as types from '../../src/actions/action-types.js'

describe('Houses reducer ', () => {

  const house = { id: 1 }
  const errors = ['error1', 'error2']

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(
      {
        isFetching: false,
        data: {},
        errors: []
      }
    )
  })

  it('should change isFetching to true, calling RECEIVE_HOUSE_REQUEST', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSE_REQUEST })).to.deep.equal(
      {
        isFetching: true
      }
    )
  })

  it('should receive house, calling RECEIVE_HOUSE_SUCCESS', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSE_SUCCESS, house })).to.deep.equal(
      {
        isFetching: false,
        data: {id: 1}
      }
    )
  })

  it('should receive errors, calling RECEIVE_HOUSE_FAILURE', () => {
    expect(reducer([], { type: types.RECEIVE_HOUSE_FAILURE, errors })).to.deep.equal(
      {
        isFetching: false,
        errors: ['error1', 'error2']
      }
    )
  })
})
