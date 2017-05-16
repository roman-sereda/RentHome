import thunk from 'redux-thunk'
import { expect } from 'chai'
import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import configureMockStore from 'redux-mock-store'

import * as actions from '../../src/actions/house'

const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

describe('House action should', () => {

  const middlewares = [ thunk ]
  const mockStore = configureMockStore( middlewares )

  afterEach(() => {
    nock.cleanAll()
  })

  it('successfuly receive house', () => {
    var response = { house: { name: 'temp' }}
    nock(host)
      .get('/houses/1')
      .reply(200, response)

    const expectedActions = [
      actions.getHouseRequest(),
      actions.getHouseSuccess(response.house)
    ]

    const store = mockStore()

    return store.dispatch(actions.getHouse(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('have failure request when house will be receiving', () => {
    var ex = { errors :{ id :[ "Wrong house ID provided" ] }}
    nock(host)
      .get('/houses/1')
      .reply(403, ex )

    const expectedActions = [
      actions.getHouseRequest(),
      actions.getHouseFailure( ex.errors )
    ]

    const store = mockStore()

    return store.dispatch(actions.getHouse(1)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })


})
