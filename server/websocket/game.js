const { isUuid } = require('uuidv4')

module.exports = io => {
  const users = {}

  const games = {}

  io.sockets.on('connection', socket => {
    users[socket.id] = {
      game: null,
      player: null,
      room: null,
      ships: null,
    }

    socket.on('ready', payload => {
      const { room } = users[socket.id]
      console.log('players in room before push:', games[room].players)
      games[room].players.push(socket.id)
      console.log('room', room)

      const readyPlayers = games[room].players.length

      console.log('players in room:', games[room].players)
      console.log('players ready:', readyPlayers)

      users[socket.id].player = readyPlayers - 1
      users[socket.id].ships = payload.ships

      io.to(socket.id).emit('player', readyPlayers - 1)

      if (readyPlayers === 2) {
        io.to(room).emit('start', games[room].turn)
      }
    })

    socket.on('room', room => {
      if (
        isUuid(room) &&
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
