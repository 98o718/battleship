import React from 'react'
import { GameWrapper } from './Game.styles'
import { PlayField, Logo } from '../../components'

export const Game = () => {
  return (
    <GameWrapper>
      <Logo />
      <PlayField />
    </GameWrapper>
  )
}
