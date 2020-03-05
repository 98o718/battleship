import React, { useState, useEffect } from 'react'
import { EndGameWrapper, Container, Image, Text } from './EndGame.styles'
import CountUp from 'react-countup'
import { Link } from 'wouter'

import scroll from '../../assets/scroll.png'

const EndGame = ({ state, active, rating, newRating }) => {
  return (
    <EndGameWrapper active={active} state={state}>
      <Container active={active}>
        <Image state={state} />
        <Text>
          <h1>{state ? 'Победа!' : 'Поражение'}</h1>

          {rating !== null && (
            <p>
              <img src={scroll} alt="scroll rating" /> &#160;
              <CountUp
                start={rating}
                end={newRating === null ? rating : newRating}
                delay={5}
              />
            </p>
          )}
          <Link to="/">Вернуться на главную</Link>
        </Text>
      </Container>
    </EndGameWrapper>
  )
}

export default EndGame
