import React, { useState } from 'react'
import { Logo, Button, Authorization, Registration } from '../../components'
import { Link, useLocation } from 'wouter'
import {
  StartWrapper,
  Wave,
  GameMenu,
  Macaroni,
  Bomb,
  Ferry,
  Text,
  Line,
  Auth,
  AuthImg,
  LinkContainer,
} from './Start.styles'

import authImg from '../../img/authImg.png'
import wave from '../../img/wave.svg'
import macaroni from '../../img/macaroniLogo.png'
import bomb from '../../img/bomb.png'
import ferry from '../../img/ferry.png'

export const Start = () => {
  const [auth, setAuth] = useState(false)
  const [reg, setReg] = useState(false)

  const [, setLocation] = useLocation()
  const handleNewRoom = () => {
    fetch(process.env.REACT_APP_GENERATE_ROOM_URL)
      .then(r => r.text())
      .then(room => setLocation(`${process.env.REACT_APP_GAME_URL}/${room}`))
  }
  // const updateData = value => {
  //   setAuth(value)
  // }
  return (
    <StartWrapper>
      <Logo></Logo>
      <Auth>
        <AuthImg src={authImg} />
        <LinkContainer>
          <Link
            to="/"
            onClick={() => {
              setAuth(true)
            }}
          >
            Войти
          </Link>{' '}
          |{' '}
          <Link
            to="/"
            onClick={() => {
              setReg(true)
            }}
          >
            Регистрация
          </Link>
        </LinkContainer>
      </Auth>
      <Registration
        active={reg}
        setActive={setReg}
        setAuth={setAuth}
        auth={auth}
      />
      <Authorization active={auth} setActive={setAuth} />
      <GameMenu>
        <Text>Выбор режима</Text>
        <Button
          onClick={() => setLocation('/waiting-room')}
          state="start"
          text="Случайная игра"
        />
        <Line />
        <Button onClick={handleNewRoom} state="start" text="Игра с другом" />
        <Macaroni src={macaroni} alt="macaroni logo" />
      </GameMenu>
      <Bomb src={bomb} alt="bomb" />
      <Ferry src={ferry} />
      <Wave src={wave} alt="wave" />
    </StartWrapper>
  )
}

export default Start
