import React, { useEffect } from 'react'
import { Route } from 'wouter'
import { Global, css } from '@emotion/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emotionNormalize from 'emotion-normalize'
import { useAtom } from '@reatom/react'
import { connectReduxDevtools } from '@reatom/debug'

import { Game, Start, WaitingRoom } from './pages'
import { authAtom, userAtom, gameTypeAtom } from './model'

export const App = ({ store }) => {
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

  useAtom(authAtom, () => null, [])
  useAtom(userAtom, () => null, [])
  useAtom(gameTypeAtom, () => null, [])

  return (
    <>
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
      <ToastContainer position="top-center" />
      <Route path="/rating-waiting-room" component={WaitingRoom} />
      <Route path="/waiting-room" component={WaitingRoom} />
      <Route path="/game/:room" component={Game} />
      <Route path="/" extends component={Start} />
    </>
  )
}
