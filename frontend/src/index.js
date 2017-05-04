import React, { Component } from 'react'
import store from './store'
import router from './router'
import ReactDOM from 'react-dom'
import styles from './styles.css'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store = { store } >
    { router }
  </Provider>,
  document.getElementById('root')
)
