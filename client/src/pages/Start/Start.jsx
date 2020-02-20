import React from 'react'
import { Logo, Button } from '../../components'
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

import { constants } from '../../constants'

import authImg from '../../img/authImg.png'
import wave from '../../img/wave.svg'
import macaroni from '../../img/macaroniLogo.png'
import bomb from '../../img/bomb.png'
import ferry from '../../img/ferry.png'

export const Start = () => {
  const [, setLocation] = useLocation()

  const handleNewRoom = () => {
    fetch(constants.GENERATE_ROOM_URL)
      .then(r => r.text())
      .then(room => setLocation(`${constants.GAME_URL}/${room}`))
  }

  return (
    <StartWrapper>
      <Logo></Logo>
      <Auth>
        <AuthImg src={authImg} />
        <LinkContainer>
          <Link to="/auth">Войти</Link> | <Link to="/auth">Регистрация</Link>
        </LinkContainer>
      </Auth>
      <GameMenu>
        <Text>Выбор режима</Text>
        <Button state="start" text="Случайная игра" />
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
