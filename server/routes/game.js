const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const router = express.Router()

router.get('/generate-room', (req, res) => {
  res.send(uuid())
})

router.post('/check-room', (req, res) => {
  const { room } = req.body

  if (
    isUuid(room) &&
    req.io.sockets.adapter.rooms[room] &&
    req.io.sockets.adapter.rooms[room].length === 2
  ) {
    res.status(404).send('Room is full')
  } else {
    res.send('Ok')
  }
})

module.exports = router
