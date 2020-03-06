import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { useAtom, useAction } from '@reatom/react'

import { gameTypes, roomTypes } from '../../constants'

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
  UserInfoWrappper,
  UserInfo,
  UserInfoEmoji,
} from './Start.styles'

import { Logo, Button, Authorization, Registration } from '../../components'
import {
  authAtom,
  userAtom,
  logout,
  setGameType,
  setRoomType,
} from '../../model'
import authImg from '../../assets/authImg.png'
import wave from '../../assets/wave.svg'
import macaroni from '../../assets/macaroniLogo.png'
import bomb from '../../assets/bomb.png'
import ferry from '../../assets/ferry.png'

export const Start = () => {
  const [auth, setAuth] = useState(false)
  const [reg, setReg] = useState(false)

  const isAuth = useAtom(authAtom)
  const user = useAtom(userAtom)
  const doLogout = useAction(logout)
  const doSetGameType = useAction(setGameType)
  const doSetRoomType = useAction(setRoomType)

  const [, setLocation] = useLocation()

  useEffect(() => {
    doSetGameType(gameTypes.REGULAR)
    doSetRoomType(roomTypes.FRIEND)
  }, [])

  const handleNewRoom = () => {
    fetch(process.env.REACT_APP_GENERATE_ROOM_URL)
      .then(r => r.text())
      .then(room => setLocation(`${process.env.REACT_APP_GAME_URL}/${room}`))
  }
  return (
    <StartWrapper>
      <Logo game={false}></Logo>
      <Auth>
        <LinkContainer>
          {isAuth && user !== null ? (
            <UserInfoWrappper>
              {user.counts && (
                <UserInfo>
                  <UserInfoEmoji role="img" aria-label="wins emoji">
                    🎉
                  </UserInfoEmoji>
                  {user.counts.wins}
                </UserInfo>
              )}
              {user.counts && (
                <UserInfo>
                  <UserInfoEmoji role="img" aria-label="loss emoji">
                    💣
                  </UserInfoEmoji>
                  {user.counts.loss}
                </UserInfo>
              )}
              {user.rating !== null && (
                <UserInfo>
                  <UserInfoEmoji role="img" aria-label="rating emoji">
                    📜
                  </UserInfoEmoji>
                  {user.rating}
                </UserInfo>
              )}
              <UserInfo>{user.username}</UserInfo> |{' '}
              <LogoutButton onClick={doLogout}>Выход</LogoutButton>
            </UserInfoWrappper>
          ) : (
            <UserInfoWrappper>
              <AuthImg src={authImg} />
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
            </UserInfoWrappper>
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
        {isAuth && (
          <>
            <Button
              onClick={() => setLocation('/rating-waiting-room')}
              state="start"
              text="Игра на рейтинг"
            />
            <Line />
          </>
        )}
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
