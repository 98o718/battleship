import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAtom, useAction } from '@reatom/react'

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
  LogoutButton,
} from './Start.styles'

import { Logo, Button, Authorization, Registration } from '../../components'
import { authAtom, usernameAtom, logout } from '../../model'
import authImg from '../../assets/authImg.png'
import wave from '../../assets/wave.svg'
import macaroni from '../../assets/macaroniLogo.png'
import bomb from '../../assets/bomb.png'
import ferry from '../../assets/ferry.png'

export const Start = () => {
  const [auth, setAuth] = useState(false)
  const [reg, setReg] = useState(false)

  const isAuth = useAtom(authAtom)
  const username = useAtom(usernameAtom)
  const doLogout = useAction(logout)

  const [, setLocation] = useLocation()

  const handleNewRoom = () => {
    fetch(process.env.REACT_APP_GENERATE_ROOM_URL)
      .then(r => r.text())
      .then(room => setLocation(`${process.env.REACT_APP_GAME_URL}/${room}`))
  }
  return (
    <StartWrapper>
      <Logo></Logo>
      <Auth>
        {!isAuth && <AuthImg src={authImg} />}
        <LinkContainer>
          {isAuth ? (
            <>
              {username} | <LogoutButton onClick={doLogout}>Выход</LogoutButton>
            </>
          ) : (
            <>
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
            </>
          )}
        </LinkContainer>
      </Auth>
      <Registration
        active={reg}
        setActive={setReg}
        setAuth={setAuth}
        auth={auth}
      />
      <Authorization
        active={auth}
        setActive={setAuth}
        setReg={setReg}
        reg={reg}
      />
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
