import React from 'react'
import { GameWrapper } from './Game.styles'
import { PlayField, Logo } from '../../components'

const Game = () => {
  return (
    <GameWrapper>
      <Logo />
      <PlayField />
    </GameWrapper>
  )
}

export default Game
