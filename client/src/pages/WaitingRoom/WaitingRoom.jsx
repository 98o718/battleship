import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useLocation } from 'wouter'
import { useAtom, useAction } from '@reatom/react'

import { roomTypes, gameTypes } from '../../constants'

import { WaitingRoomWrapper } from './WaitingRoom.styles'
import { authAtom, setGameType, setRoomType } from '../../model'

const WaitingRoom = () => {
  const [location, setLocation] = useLocation()

  const isAuth = useAtom(authAtom)
  const doSetGameType = useAction(setGameType)
  const doSetRoomType = useAction(setRoomType)

  useEffect(() => {
    const socket = io({ endpoint: process.env.REACT_APP_WS_ENDPOINT })

    if (!isAuth && location === roomTypes.RANKED) {
      setLocation('/')
    }

    socket.emit('wait', location)

    socket.on('game-ready', room => {
      socket.emit('disconnect')

      if (location === roomTypes.RANKED) {
        doSetGameType(gameTypes.RANKED)
        doSetRoomType(roomTypes.RANKED)
      } else if (location === roomTypes.REGULAR) {
        doSetGameType(gameTypes.REGULAR)
        doSetRoomType(roomTypes.REGULAR)
      }

      setLocation(`/game/${room}`)
    })

    return () => {
      socket.close()
    }
  }, [setLocation])

  return (
    <WaitingRoomWrapper>
      Ожидаем соперника{' '}
      <span role="img" aria-label="img">
        ⏳
      </span>
    </WaitingRoomWrapper>
  )
}

export default WaitingRoom
