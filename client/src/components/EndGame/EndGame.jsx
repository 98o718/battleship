import React, { useState, useEffect } from 'react'
import { EndGameWrapper, Container, Image, Text } from './EndGame.styles'
import CountUp from 'react-countup'
import { Link } from 'wouter'

import scroll from '../../assets/scroll.png'

const EndGame = props => {
  const [rating, setRating] = useState(undefined)
  const [state, setState] = useState(undefined)
  useEffect(() => {
    if (props.active) setRating(800)
    if (props.state) setState('Победа!')
    else setState('Поражение')
  }, [props.active, props.state])
  return (
    <EndGameWrapper active={props.active} state={props.state}>
      <Container active={props.active}>
        <Image state={props.state} />
        <Text>
          <h1>{state}</h1>
          <p>
            <img src={scroll} alt="scroll rating" /> &#160;
            <CountUp start={rating} end={rating + 25} delay={2}></CountUp>
          </p>
          <Link to="/">Вернуться на главную</Link>
        </Text>
      </Container>
    </EndGameWrapper>
  )
}

export default EndGame
