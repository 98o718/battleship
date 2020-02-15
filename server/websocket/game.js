const { isUuid } = require('uuidv4')

module.exports = io => {
  io.sockets.on('connection', socket => {
    socket.on('room', room => {
      if (
        isUuid(room) &&
        (!io.sockets.adapter.rooms[room] ||
          io.sockets.adapter.rooms[room].length < 2)
      ) {
        socket.join(room)
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
