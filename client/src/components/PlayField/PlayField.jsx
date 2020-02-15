import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useRoute } from 'wouter'

import { PlayFieldWrapper, Line, Point } from './PlayField.styles'

const PlayField = () => {
  const [, params] = useRoute('/game/:room')

  useEffect(() => {
    const socket = io({ endpoint: 'http://localhost:3000' })
    const { room } = params

    fetch('/game/check-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room,
      }),
    }).then(r => {
      console.log(r)
      if (r.ok) {
        socket.emit('room', room)
      } else {
        alert('room is full')
      }
    })
  }, [params.room])

  return <PlayFieldWrapper>KEK</PlayFieldWrapper>
}

export default PlayField
