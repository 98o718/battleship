const { roomChecker, roomGenerator } = require('../utils/roomUtils')
const { updateRating } = require('../services/statService')
const config = require('./../config')

const jwt = require('jsonwebtoken')

module.exports = io => {
  const users = {}

  const games = {}

  const waitingRoom = {}

  io.sockets.on('connection', socket => {
    users[socket.id] = {
      game: null,
      player: null,
      room: null,
      ships: null,
      flatShips: null,
      username: null,
      rating: null,
      token: null,
      counts: null,
      gameType: null,
    }

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnect')
      const { room } = users[socket.id]
      delete games[room]
      delete users[socket.id]

      for (const [key, value] of Object.entries(waitingRoom)) {
        waitingRoom[key] = waitingRoom[key].filter(id => id !== socket.id)
      }

      io.to(room).emit('leave')
    })

    socket.on('giveup', async () => {
      const { room, player } = users[socket.id]
      const { players } = games[room]

      const opponent = players[(users[socket.id].player + 1) % 2]

      if (
        users[socket.id].gameType === 'ranking-game' &&
        users[opponent].gameType === 'ranking-game'
      ) {
        console.log('kek')
        try {
          const { username } = jwt.verify(
            users[socket.id].token,
            config.jwt.secret
          )
          const { opponentUsername } = jwt.verify(
            users[opponent].token,
            config.jwt.secret
          )

          if (username === opponentUsername) {
            throw new Error('Одинаковые имена!')
          }

          const rating = await updateRating(
            users[opponent].username,
            users[socket.id].username
          )

          io.to(room).emit('giveup', { player, rating })
        } catch (e) {
          console.log(e)
        }
      } else {
        io.to(room).emit('giveup', { player })
      }
    })

    socket.on('ready', payload => {
      const { room } = users[socket.id]
      if (
        games[room] &&
        games[room].ready &&
        !games[room].ready.includes(socket.id)
      ) {
        games[room].ready.push(socket.id)
        console.log('room', room)

        const readyPlayers = games[room].ready.length

        console.log('ready players in room:', games[room].ready)

        users[socket.id].ships = payload.ships.map((ship, idx) => {
          return {
            id: idx,
            coords: ship,
            size: ship.length,
            hits: 0,
          }
        })

        users[socket.id].flatShips = payload.ships.flat()

        if (readyPlayers === 2) {
          io.to(room).emit('start', {
            turn: games[room].turn,
          })
        }
      }
    })

    socket.on('shot', async shot => {
      const { room } = users[socket.id]
      const { players, turn } = games[room]

      if (socket.id !== players[turn]) {
        // если чужая очередь
      } else {
        const opponent = players[(turn + 1) % 2]

        let hit = false
        let willBeDeleted = false

        users[opponent].ships.forEach(ship => {
          ship.coords.forEach(coord => {
            if (coord.x === shot.x && coord.y === shot.y) {
              hit = true
              ship.hits += 1
              if (ship.hits === ship.size) willBeDeleted = ship.id
            }
          })
        })

        games[room].turn = hit ? turn : (turn + 1) % 2

        io.to(room).emit('result', {
          turn: hit ? turn : (turn + 1) % 2,
          shot,
          hit,
        })

        if (typeof willBeDeleted === 'number') {
          users[opponent].ships = users[opponent].ships.filter(ship => {
            if (ship.id !== willBeDeleted) {
              return true
            } else {
              io.to(room).emit('killed', ship)
              return false
            }
          })
        }

        if (users[opponent].ships.length === 0) {
          if (
            users[socket.id].gameType === 'ranking-game' &&
            users[opponent].gameType === 'ranking-game'
          ) {
            try {
              const { username } = jwt.verify(
                users[socket.id].token,
                config.jwt.secret
              )
              const { opponentUsername } = jwt.verify(
                users[opponent].token,
                config.jwt.secret
              )

              if (username === opponentUsername) {
                throw new Error('Одинаковые имена!')
              }

              const rating = await updateRating(
                users[socket.id].username,
                users[opponent].username
              )

              io.to(room).emit('gameover', { turn, rating })
            } catch (e) {}
          } else {
            io.to(room).emit('gameover', { turn })
          }
        }
      }
    })

    socket.on('wait', room => {
      console.log(room)
      if (!waitingRoom[room]) {
        waitingRoom[room] = []
      }

      waitingRoom[room].push(socket.id)

      if (waitingRoom[room].length === 2) {
        const gameRoom = roomGenerator()

        io.to(waitingRoom[room].pop()).emit('game-ready', gameRoom)
        io.to(waitingRoom[room].pop()).emit('game-ready', gameRoom)
      }
    })

    socket.on('room', ({ room, user, gameType }) => {
      if (
        roomChecker(room) &&
        (!io.sockets.adapter.rooms[room] ||
          io.sockets.adapter.rooms[room].length < 2)
      ) {
        socket.join(room)
        users[socket.id].room = room

        if (!games[room]) {
          games[room] = {
            players: [],
            ready: [],
            turn: Math.floor(Math.random() * 2),
          }
        }

        games[room].players.push(socket.id)

        const readyPlayers = games[room].players.length

        users[socket.id].player = readyPlayers - 1

        users[socket.id].gameType = gameType

        if (user !== null && user) {
          users[socket.id].username = user.username
          users[socket.id].token = user.token
          users[socket.id].counts = user.counts
          users[socket.id].rating = user.rating
        }

        if (readyPlayers === 2) {
          for (let [idx, id] of games[room].players.entries()) {
            let opponentIndex = (idx + 1) % 2

            io.to(id).emit('player', {
              player: idx,
              opponent: users[games[room].players[opponentIndex]].username
                ? {
                    username:
                      users[games[room].players[opponentIndex]].username,
                    counts: users[games[room].players[opponentIndex]].counts,
                    rating: users[games[room].players[opponentIndex]].rating,
                  }
                : null,
            })
          }
        }

        console.log(socket.id)
        console.log('joined room', room)
        console.log(
          'there are',
          io.sockets.adapter.rooms[room].length,
          'people'
        )
      } else {
        console.log('room is full')
      }
    })
  })
}
