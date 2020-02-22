const express = require('express')
const { roomChecker, roomGenerator } = require('../utils/roomUtils')

const router = express.Router()

router.get('/generate-room', (req, res) => {
  res.send(roomGenerator())
})

router.post('/check-room', (req, res) => {
  const { room } = req.body

  if (
    roomChecker(room) &&
    req.io.sockets.adapter.rooms[room] &&
    req.io.sockets.adapter.rooms[room].length === 2
  ) {
    res.status(404).send('Room is full')
  } else {
    res.send('Ok')
  }
})

module.exports = router
