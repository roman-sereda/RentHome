import thunk from 'redux-thunk'
import { expect } from 'chai'
import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import configureMockStore from 'redux-mock-store'

import * as actions from '../../src/actions/houses'

const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

describe('Houses action should', () => {

  const middlewares = [ thunk ]
  const mockStore = configureMockStore( middlewares )

  afterEach(() => {
    nock.cleanAll()
  })

  it('successfuly receive houses', () => {
    var response = { houses: ['temp1', 'temp2'] }
    nock(host)
      .get('/houses/search')
      .reply(200, response)

    const expectedActions = [
      actions.getHousesRequest(),
      actions.getHousesSuccess(response.houses)
    ]

    const store = mockStore()

    return store.dispatch(actions.getHouses( null )).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('have failure request when houses will be receiving', () => {
    var ex = { errors :{ id :[ "Wrong house ID provided" ] }}
    nock(host)
      .get('/houses/search')
      .reply(403, ex)

    const expectedActions = [
      actions.getHousesRequest(),
      actions.getHousesFailure( ex.errors )
    ]

    const store = mockStore()

    return store.dispatch(actions.getHouses( false )).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })


})
