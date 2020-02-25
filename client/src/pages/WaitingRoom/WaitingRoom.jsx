import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useLocation } from 'wouter'
import { WaitingRoomWrapper } from './WaitingRoom.styles'

export const WaitingRoom = () => {
  const [, setLocation] = useLocation()

  useEffect(() => {
    const socket = io({ endpoint: process.env.REACT_APP_WS_ENDPOINT })

    socket.emit('waiting-room')

    socket.on('game-ready', room => {
      socket.emit('disconnect')

      setLocation(`/game/${room}`)
    })
  }, [])

  return <WaitingRoomWrapper>Ожидаем соперника ⏳</WaitingRoomWrapper>
}
