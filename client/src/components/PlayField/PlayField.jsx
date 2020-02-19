import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useRoute } from 'wouter'

import { PlayFieldWrapper, Line, Point } from './PlayField.styles'

const PlayField = () => {
  const [, params] = useRoute('/game/:room')
  const [player, setPlayer] = useState(-1)

  useEffect(() => {
    const socket = io({ endpoint: 'http://localhost:3000' })
    const { room } = params

    const ships = [
      [
        { y: 0, x: 0 },
        { y: 0, x: 1 },
        { y: 0, x: 2 },
        { y: 0, x: 4 },
      ],
      [
        { y: 0, x: 5 },
        { y: 0, x: 6 },
        { y: 0, x: 7 },
      ],
      [
        { y: 2, x: 0 },
        { y: 2, x: 1 },
        { y: 2, x: 2 },
      ],
      [
        { y: 2, x: 4 },
        { y: 2, x: 5 },
      ],
      [
        { y: 2, x: 7 },
        { y: 2, x: 8 },
      ],
      [
        { y: 4, x: 0 },
        { y: 4, x: 1 },
      ],
      [{ y: 6, x: 0 }],
      [{ y: 6, x: 2 }],
      [{ y: 6, x: 4 }],
      [{ y: 6, x: 6 }],
    ]

    socket.on('player', player => setPlayer(player))

    socket.on('start', turn => {
      alert(`Game start, player ${turn + 1} turn!`)
    })

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
        setTimeout(() => {
          socket.emit('ready', {
            ships,
          })
        }, 3000)
      } else {
        alert('room is full')
      }
    })
  }, [params.room])

  return <PlayFieldWrapper>KEK</PlayFieldWrapper>
}

export default PlayField
