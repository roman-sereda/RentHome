import React from 'react'
import sinon from 'sinon'
import simulant from 'simulant'
import { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import * as router from 'react-router'
import { render, mount, shallow } from 'enzyme'

import Auth from '../../src/components/Auth'
import SignIn from '../../src/components/Auth/SignInForm'

const router_props = { 'routes': [ 'none', 'none', { 'auth': 'signin' }]}

describe('<Auth /> should', () => {
  const AuthMount = mount(<Auth {...router_props} />, { attachTo: document.body })
  const AuthRender = render(<Auth />)

  it('renders two auth buttons', () => {
    expect(AuthRender.find('#signup').length).to.equal(1)
    expect(AuthRender.find('#signin').length).to.equal(1)
  })

  it('render child compoennt - SignIn', () => {
    expect(AuthMount.children()).to.have.length(1)
  })

  it('store route props', () => {
    expect(AuthMount.props().routes[2].auth).to.equal('signin')
  })

  /*it('live component if was clicked not on the modal window', () => {
    router.browserHistory = { push: () => {} }
    let browserHistoryPushStub = sinon.spy(router.browserHistory, 'push')
    simulant.fire(document.body.querySelector('#modal-window'), 'click')
    sinon.assert.calledOnce(browserHistoryPushStub)
  })*/


})
