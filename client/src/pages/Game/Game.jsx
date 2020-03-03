import React, { useState } from 'react'
import { GameWrapper } from './Game.styles'
import { PlayField, Logo } from '../../components'

const Game = () => {
  const [game, setGame] = useState(true)
  return (
    <GameWrapper>
      <Logo game={game} />
      <PlayField setGame={setGame} />
    </GameWrapper>
  )
}

export default Game
