import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useRoute, useLocation } from 'wouter'

import {
  PlayFieldWrapper,
  Line,
  Point,
  Field,
  Button,
  FieldsWrapper,
} from './PlayField.styles'

const PlayField = () => {
  const [, params] = useRoute('/game/:room')
  const [, setLocation] = useLocation()
  const [player, setPlayer] = useState(undefined)
  const [turn, setTurn] = useState(undefined)
  const [myField, setMyField] = useState(undefined)
  const [opponentField, setOpponentField] = useState(undefined)
  const [sio, setSio] = useState(undefined)
  const [ships, setShips] = useState(undefined)

  useEffect(() => {
    const socket = io({ endpoint: 'http://localhost:3000' })
    setSio(socket)
    const room = params.room

    const ships = [
      [
        { y: 0, x: 0 },
        { y: 0, x: 1 },
        { y: 0, x: 2 },
        { y: 0, x: 3 },
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

    setShips(ships)

    const matrix = [...Array(10)].map(() => Array(10).fill(0))

    ships.flat().forEach(point => {
      matrix[point.y][point.x] = 1
    })

    setMyField(matrix)
    setOpponentField([...Array(10)].map(() => Array(10).fill(0)))

    socket.on('player', player => setPlayer(player))

    socket.on('start', turn => {
      setTurn(turn)
      alert(`Game start, player ${turn + 1} turn!`)
    })

    socket.on('gameover', turn => {
      alert(`Player ${turn + 1} won!`)
      setLocation('/')
    })

    socket.on('leave', () => {
      setLocation('/')
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
      if (r.ok) {
        socket.emit('room', room)
      } else {
        alert('room is full')
        setLocation('/')
      }
    })
    // eslint-disable-next-line
  }, [setLocation])

  useEffect(() => {
    const setPoint = (prev, shot, hit) => {
      let b = prev.slice()
      b[shot.y][shot.x] = hit ? 2 : 3
      return b
    }
    if (sio) {
      sio.off('result')
      sio.on('result', payload => {
        const { hit, shot } = payload
        console.log('hit', hit)
        console.log('turn', turn, 'player', player)
        if (turn === player) {
          setOpponentField(prev => setPoint(prev, shot, hit))
        } else {
          setMyField(prev => setPoint(prev, shot, hit))
        }
        setTurn(payload.turn)
      })

      const setPointsAroud = (prev, id) => {
        let b = prev.slice()

        console.log(id)
        ships[id].forEach(({ y, x }) => {
          b[y + 1] && (b[y + 1][x] = b[y + 1][x] === 0 ? 3 : b[y + 1][x])
          b[y + 1] &&
            (b[y + 1][x - 1] = b[y + 1][x - 1] === 0 ? 3 : b[y + 1][x - 1])
          b[y + 1] &&
            (b[y + 1][x + 1] = b[y + 1][x + 1] === 0 ? 3 : b[y + 1][x + 1])
          b[y - 1] && (b[y - 1][x] = b[y - 1][x] === 0 ? 3 : b[y - 1][x])
          b[y - 1] &&
            (b[y - 1][x - 1] = b[y - 1][x - 1] === 0 ? 3 : b[y - 1][x - 1])
          b[y - 1] &&
            (b[y - 1][x + 1] = b[y - 1][x + 1] === 0 ? 3 : b[y - 1][x + 1])
          b[y] && (b[y][x - 1] = b[y][x - 1] === 0 ? 3 : b[y][x - 1])
          b[y] && (b[y][x + 1] = b[y][x + 1] === 0 ? 3 : b[y][x + 1])
        })

        return b
      }

      sio.off('killed')
      sio.on('killed', id => {
        console.log(id)
        if (turn === player) {
          setOpponentField(prev => setPointsAroud(prev, id))
        } else {
          setMyField(prev => setPointsAroud(prev, id))
        }
      })
    }
  }, [player, turn, sio, ships])

  const handleShot = (x, y) => {
    if (turn >= 0 && turn === player && opponentField[y][x] === 0)
      sio.emit('shot', {
        y,
        x,
      })
  }

  const handleReady = () => {
    sio.emit('ready', {
      ships,
    })
  }

  return (
    <PlayFieldWrapper>
      <FieldsWrapper>
        <Field>
          {myField &&
            myField.map((line, y) => {
              return (
                <Line key={y}>
                  {line.map((point, x) => (
                    <Point status={point} key={x} />
                  ))}
                </Line>
              )
            })}
        </Field>
        <Field style={{ opacity: turn === player ? 1 : 0.2 }}>
          {opponentField &&
            opponentField.map((line, y) => {
              return (
                <Line key={y}>
                  {line.map((point, x) => (
                    <Point
                      status={point}
                      key={x}
                      opponent
                      onClick={() => handleShot(x, y)}
                    />
                  ))}
                </Line>
              )
            })}
        </Field>
      </FieldsWrapper>
      <Button onClick={handleReady}>Готов</Button>
      {turn >= 0 && (
        <p>
          Вы игрок {player + 1}. Очередь игрока {turn + 1}
        </p>
      )}
    </PlayFieldWrapper>
  )
}

export default PlayField
