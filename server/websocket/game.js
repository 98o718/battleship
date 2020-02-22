const { roomChecker, roomGenerator } = require('../utils/roomUtils')

module.exports = io => {
  const users = {}

  const games = {}

  const waitingRoom = []

  io.sockets.on('connection', socket => {
    users[socket.id] = {
      game: null,
      player: null,
      room: null,
      ships: null,
      flatShips: null,
    }

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnect')
      const { room } = users[socket.id]
      delete games[room]
      delete users[socket.id]

      io.to(room).emit('leave')
    })

    socket.on('ready', payload => {
      const { room } = users[socket.id]
      games[room].players.push(socket.id)
      console.log('room', room)

      const readyPlayers = games[room].players.length

      console.log('players in room:', games[room].players)

      users[socket.id].player = readyPlayers - 1
      users[socket.id].ships = payload.ships.map((ship, idx) => {
        return {
          id: idx,
          coords: ship,
          size: ship.length,
          hits: 0,
        }
      })
      users[socket.id].flatShips = payload.ships.flat()

      io.to(socket.id).emit('player', readyPlayers - 1)

      if (readyPlayers === 2) {
        io.to(room).emit('start', games[room].turn)
      }
    })

    socket.on('shot', shot => {
      const { room } = users[socket.id]
      const { players, turn } = games[room]

      console.log('shot')

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
          users[opponent].ships = users[opponent].ships.filter(
            ship => ship.id !== willBeDeleted
          )
          io.to(room).emit('killed', willBeDeleted)
        }

        if (users[opponent].ships.length === 0) {
          io.to(room).emit('gameover', turn)
        }
      }
    })

    socket.on('waiting-room', () => {
      waitingRoom.push(socket.id)

      if (waitingRoom.length === 2) {
        const room = roomGenerator()

        io.to(waitingRoom.pop()).emit('game-ready', room)
        io.to(waitingRoom.pop()).emit('game-ready', room)
      }
    })

    socket.on('room', room => {
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
            turn: Math.floor(Math.random() * 2),
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
