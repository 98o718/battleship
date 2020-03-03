import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '@reatom/core'
import { Provider } from '@reatom/react'

import { App } from './App'

const store = createStore(JSON.parse(`${localStorage.getItem('app_store')}`))

ReactDOM.render(
  <Provider value={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
