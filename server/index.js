const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const gameSocket = require('./websocket/game')

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', require('./routes/auth'))
app.use('/game', require('./routes/game'))

gameSocket(io)

http.listen(process.env.PORT || 3000, () => {
  console.log(`Battleship app listening on port ${process.env.PORT || 3000}!`)
})
