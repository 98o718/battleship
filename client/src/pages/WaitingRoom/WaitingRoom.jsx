import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useLocation } from 'wouter'
import { WaitingRoomWrapper } from './WaitingRoom.styles'

export const WaitingRoom = () => {
  const [, setLocation] = useLocation()

  useEffect(() => {
    const socket = io({ endpoint: 'http://localhost:3000' })

    socket.emit('waiting-room')

    socket.on('game-ready', room => {
      socket.emit('disconnect')

      setLocation(`/game/${room}`)
    })
  }, [])

  return <WaitingRoomWrapper>Ожидаем соперника ⏳</WaitingRoomWrapper>
}
