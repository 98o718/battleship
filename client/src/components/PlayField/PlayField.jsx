import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useRoute, useLocation } from 'wouter'
import { toast } from 'react-toastify'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import {
  PlayFieldWrapper,
  FieldsWrapper,
  CenterField,
} from './PlayField.styles'

import { shipSizes, shipTypes } from '../../constants'

import { Button, EndGame, Field, ShipPicker } from '..'
import GiveUp from '../GiveUp'

const PlayField = props => {
  const [, params] = useRoute('/game/:room')
  const [, setLocation] = useLocation()

  const [player, setPlayer] = useState(undefined)
  const [turn, setTurn] = useState(undefined)
  const [myField, setMyField] = useState(undefined)
  const [opponentField, setOpponentField] = useState(undefined)
  const [sio, setSio] = useState(undefined)
  const [ships, setShips] = useState([])
  const [endGame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(undefined)
  const [arrange, setArrange] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const template = [
    shipTypes.FERRY,
    shipTypes.SHIP,
    shipTypes.SHIP,
    shipTypes.SPEEDBOAT,
    shipTypes.SPEEDBOAT,
    shipTypes.SPEEDBOAT,
    shipTypes.SAILBOAT,
    shipTypes.SAILBOAT,
    shipTypes.SAILBOAT,
    shipTypes.SAILBOAT,
  ]

  const [shipsTemplate, setShipsTemplate] = useState(template)

  const placeShips = ships => {
    const matrix = [...Array(10)].map(() => Array(10).fill(0))

    ships.flat().forEach(point => {
      switch (point.v) {
        case 4: {
          matrix[point.y][point.x] = 'ferry'
          break
        }
        case 3: {
          matrix[point.y][point.x] = 'ship'
          break
        }
        case 2: {
          matrix[point.y][point.x] = 'speedboat'
          break
        }
        case 1: {
          matrix[point.y][point.x] = 'sailboat'
          break
        }
        default: {
          matrix[point.y][point.x] = 'ship'
        }
      }
    })

    setMyField(matrix)
  }
  useEffect(() => {
    const room = params.room
    fetch(process.env.REACT_APP_CHECK_ROOM_URL, {
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
        toast.error('Комната уже заполнена!')
        setLocation('/')
      }
    })

    const socket = io({ endpoint: process.env.REACT_APP_WS_ENDPOINT })
    setSio(socket)

    handleRandom()

    setOpponentField([...Array(10)].map(() => Array(10).fill(0)))

    socket.on('player', player => setPlayer(player))

    socket.on('start', turn => {
      setTurn(turn)
      props.setGame(false)
      toast.success(`Игра началась, очередь игрока ${turn + 1}!`)
    })

    socket.on('leave', () => {
      socket.close()
      toast.error('Противник отключился!')
      setLocation('/')
    })

    return () => socket.close()
    // eslint-disable-next-line
  }, [setLocation])

  useEffect(() => {
    ships && placeShips(ships)
  }, [ships])

  useEffect(() => {
    const setPoint = (prev, shot, hit) => {
      let b = prev.slice()
      b[shot.y][shot.x] = hit ? 'hit' : 'shot'
      return b
    }

    if (sio) {
      sio.off('result')
      sio.on('result', payload => {
        const { hit, shot } = payload
        if (turn === player) {
          setOpponentField(prev => setPoint(prev, shot, hit))
        } else {
          setMyField(prev => setPoint(prev, shot, hit))
        }
        setTurn(payload.turn)
      })

      const setPointsAroud = (prev, ship) => {
        let b = prev.slice()

        ship.coords.forEach(({ y, x }) => {
          console.log(y, x)
          b[y + 1] && b[y + 1][x] === 0 && (b[y + 1][x] = 'shot')
          b[y + 1] && b[y + 1][x + 1] === 0 && (b[y + 1][x + 1] = 'shot')
          b[y + 1] && b[y + 1][x - 1] === 0 && (b[y + 1][x - 1] = 'shot')
          b[y] && b[y][x + 1] === 0 && (b[y][x + 1] = 'shot')
          b[y] && b[y][x - 1] === 0 && (b[y][x - 1] = 'shot')
          b[y - 1] && b[y - 1][x] === 0 && (b[y - 1][x] = 'shot')
          b[y - 1] && b[y - 1][x + 1] === 0 && (b[y - 1][x + 1] = 'shot')
          b[y - 1] && b[y - 1][x - 1] === 0 && (b[y - 1][x - 1] = 'shot')
        })

        return b
      }

      sio.off('killed')
      sio.on('killed', ship => {
        if (turn === player) {
          setOpponentField(prev => setPointsAroud(prev, ship))
        } else {
          setMyField(prev => setPointsAroud(prev, ship))
        }
      })

      sio.off('gameover')
      sio.on('gameover', num => {
        setEndGame(true)
        if (player === num) {
          setWinner(true)
        } else {
          setWinner(false)
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

  const handleReset = () => {
    setShipsTemplate(template)
    setShips([])
  }

  const handleRandom = () => {
    let matrix = [...Array(10)].map(() => Array(10).fill(0))
    const shipsTemplate = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

    let ships = shipsTemplate.map(size => {
      let set = false
      let ship = []

      while (!set) {
        let copy = matrix.map(array => array.slice())
        ship = []
        let x = (Math.random() * 10) | 0
        let y = (Math.random() * 10) | 0
        let dir = (Math.random() * 2) | 0

        for (let i = 0; i < size; i++) {
          if (copy[y] && copy[y][x] === 0) {
            ship.push({
              x,
              y,
              v: size,
            })

            copy[y][x] = 1

            switch (dir) {
              case 0:
                if (i === 0) {
                  copy[y - 1] && (copy[y - 1][x] = 1)
                  copy[y - 1] && (copy[y - 1][x + 1] = 1)
                  copy[y - 1] && (copy[y - 1][x - 1] = 1)
                }
                if (i === size - 1) {
                  copy[y + 1] && (copy[y + 1][x] = 1)
                  copy[y + 1] && (copy[y + 1][x + 1] = 1)
                  copy[y + 1] && (copy[y + 1][x - 1] = 1)
                }
                copy[y][x - 1] = 1
                copy[y][x + 1] = 1
                y++
                break
              case 1:
                if (i === 0) {
                  copy[y + 1] && (copy[y + 1][x - 1] = 1)
                  copy[y] && (copy[y][x - 1] = 1)
                  copy[y - 1] && (copy[y - 1][x - 1] = 1)
                }
                if (i === size - 1) {
                  copy[y + 1] && (copy[y + 1][x + 1] = 1)
                  copy[y] && (copy[y][x + 1] = 1)
                  copy[y - 1] && (copy[y - 1][x + 1] = 1)
                }
                copy[y + 1] && (copy[y + 1][x] = 1)
                copy[y - 1] && (copy[y - 1][x] = 1)
                x++
                break
              default:
                break
            }
          } else {
            break
          }

          if (i === size - 1) {
            set = true
            matrix = copy.slice()
          }
        }
      }

      return ship
    })

    setShips(ships)
  }

  const canPlace = (x, y, item) => {
    if (!item.isRotated) {
      if (
        !(
          (!myField[y - 1] ||
            ((myField[y - 1][x - 1] === 0 || !myField[y - 1][x - 1]) &&
              myField[y - 1][x] === 0 &&
              (myField[y - 1][x + 1] === 0 || !myField[y - 1][x + 1]))) &&
          (myField[y][x - 1] === 0 || !myField[y][x - 1]) &&
          (myField[y][x + 1] === 0 || !myField[y][x + 1]) &&
          myField[y][x] === 0
        )
      ) {
        return false
      }

      for (let i = 1; i <= shipSizes[item.type]; i++) {
        if (
          i === shipSizes[item.type] &&
          !(
            !myField[y + i] ||
            (myField[y + i][x] === 0 &&
              (myField[y + i][x - 1] === 0 || !myField[y + i][x - 1]) &&
              (myField[y + i][x + 1] === 0 || !myField[y + i][x + 1]))
          )
        ) {
          return false
        } else if (
          i !== shipSizes[item.type] &&
          !(
            myField[y + i] &&
            myField[y + i][x] === 0 &&
            (myField[y + i][x - 1] === 0 || !myField[y + i][x - 1]) &&
            (myField[y + i][x + 1] === 0 || !myField[y + i][x + 1])
          )
        ) {
          return false
        }
      }
      return true
    } else {
      if (
        !(
          myField[y][x] === 0 &&
          (myField[y][x - 1] === 0 || !myField[y][x - 1]) &&
          (!myField[y - 1] ||
            ((myField[y - 1][x - 1] === 0 || !myField[y - 1][x - 1]) &&
              (myField[y - 1][x] === 0 || !myField[y - 1][x]))) &&
          (!myField[y + 1] ||
            ((myField[y + 1][x - 1] === 0 || !myField[y + 1][x - 1]) &&
              (myField[y + 1][x] === 0 || myField[y + 1][x] === 0))) &&
          (myField[y][x + shipSizes[item.type]] === 0 ||
            !myField[y][x + shipSizes[item.type]]) &&
          (!myField[y - 1] ||
            myField[y - 1][x + shipSizes[item.type]] === 0 ||
            !myField[y - 1][x + shipSizes[item.type]]) &&
          (!myField[y + 1] ||
            myField[y + 1][x + shipSizes[item.type]] === 0 ||
            !myField[y + 1][x + shipSizes[item.type]])
        )
      ) {
        return false
      }

      for (let i = 1; i < shipSizes[item.type]; i++) {
        if (
          !(
            myField[y][x + i] === 0 &&
            (!myField[y - 1] || myField[y - 1][x + i] === 0) &&
            (!myField[y + 1] || myField[y + 1][x + i] === 0)
          )
        ) {
          return false
        }
      }

      return true
    }
  }

  const dropShip = (x, y, item) => {
    let ship = []

    if (!item.isRotated) {
      for (let i = 0; i < shipSizes[item.type]; i++) {
        ship.push({
          x,
          y: y + i,
          v: shipSizes[item.type],
        })
      }
    } else {
      for (let i = 0; i < shipSizes[item.type]; i++) {
        ship.push({
          x: x + i,
          y,
          v: shipSizes[item.type],
        })
      }
    }

    setShips(prev => {
      let b = prev.slice()

      b.push(ship)

      return b
    })

    setShipsTemplate(prev => {
      let idx = prev.indexOf(item.type)
      let b = prev.slice()
      b.splice(idx, 1)

      return b
    })
  }
  return (
    <DndProvider backend={Backend}>
      <PlayFieldWrapper>
        <FieldsWrapper>
          {arrange && (
            <ShipPicker
              ships={ships && ships.length === 10 ? [] : shipsTemplate}
            />
          )}
          <Field matrix={myField} dropShip={dropShip} canPlace={canPlace} />
          <CenterField>
            {turn >= 0 ? (
              <>
                <p>
                  Вы игрок {player + 1}. <br /> Очередь игрока {turn + 1}
                </p>
                <Button
                  onClick={() => setIsOpen(true)}
                  state="giveUp"
                  style={{ marginBottom: 15 }}
                  text="Сдаться"
                />
              </>
            ) : (
              <>
                {arrange && (
                  <Button
                    onClick={handleReset}
                    state="common"
                    style={{ marginBottom: 15 }}
                    text="Сброс"
                  />
                )}
                {arrange && (
                  <Button
                    onClick={handleRandom}
                    state="common"
                    style={{ marginBottom: 15 }}
                    text="Случайно"
                  />
                )}
                {!arrange && (
                  <Button
                    onClick={() => setArrange(!arrange)}
                    state="common"
                    style={{ marginBottom: 15 }}
                    text="Расставить"
                  />
                )}
                <Button
                  onClick={
                    arrange
                      ? () => {
                          setArrange(!arrange)
                        }
                      : handleReady
                  }
                  state="ready"
                  disabled={ships.length < 10}
                  text={arrange ? 'Ок' : 'Готов'}
                />
              </>
            )}
          </CenterField>
          {!arrange && (
            <Field
              matrix={opponentField}
              opponent={true}
              handleShot={handleShot}
              dropShip={dropShip}
              canPlace={canPlace}
              style={{ opacity: turn === player ? 1 : 0.2 }}
            />
          )}
        </FieldsWrapper>
        <GiveUp isOpen={isOpen} setIsOpen={setIsOpen} />
        <EndGame active={endGame} state={winner} />
      </PlayFieldWrapper>
    </DndProvider>
  )
}

export default PlayField
