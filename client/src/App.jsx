import React from 'react'
import { Route } from 'wouter'
import { Global, css } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

import { Game, Start, WaitingRoom } from './pages'

export const App = () => {
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
        `}
      />

      <Route path="/waiting-room" component={WaitingRoom} />
      <Route path="/game/:room" component={Game} />
      <Route path="/" extends component={Start} />
    </>
  )
}
