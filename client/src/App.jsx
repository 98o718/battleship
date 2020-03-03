import React, { useEffect } from 'react'
import { Route } from 'wouter'
import { Global, css } from '@emotion/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emotionNormalize from 'emotion-normalize'
import { createStore } from '@reatom/core'
import { context } from '@reatom/react'
import { connectReduxDevtools } from '@reatom/debug'

import { Game, Start, WaitingRoom } from './pages'

export const App = () => {
  const store = createStore(
    JSON.parse(`${localStorage.getItem('app_store')}`) || {}
  )

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      connectReduxDevtools(store)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    return store.subscribe(() =>
      localStorage.setItem('app_store', JSON.stringify(store.getState()))
    )
  })

  return (
    <context.Provider value={store}>
      <Global
        styles={css`
          ${emotionNormalize}
          html,
          body {
            padding: 0;
            margin: 0;
            background: white;
            min-height: 100%;
            font-family: Helvetica, Arial, sans-serif;
          }

          .Toastify__toast {
            border-radius: 5px;

            &--success {
              background: #4caf50;
            }
          }
        `}
      />
      <ToastContainer />
      <Route path="/waiting-room" component={WaitingRoom} />
      <Route path="/game/:room" component={Game} />
      <Route path="/" extends component={Start} />
    </context.Provider>
  )
}
