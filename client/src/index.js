import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '@reatom/core'
import { Provider } from '@reatom/react'

import { gameTypes } from './constants'

import { App } from './App'

const store = createStore(
  Object.assign({}, JSON.parse(`${localStorage.getItem('app_store')}`), {
    gameType: gameTypes.REGULAR,
  })
)

ReactDOM.render(
  <Provider value={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
