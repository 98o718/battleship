const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const gameSocket = require('./websocket/game')
const jwt = require('jsonwebtoken')
const config = require('./config')

const isAuth = (req, res, next) => {
  let token = req.headers['authorization'] || ''
  token = token.split(' ')
  try {
    if (token[0] === 'Bearer' && token[1]) {
      jwt.verify(token[1], config.jwt.secret)
      res.locals.auth = jwt.decode(token[1], config.jwt.secret)
      next()
    } else throw new Exception()
  } catch (e) {
    return res.json({ status: false, message: 'Аккаунт не авторизован' })
  }
}

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', require('./routes/auth'))
app.use('/game', require('./routes/game'))

app.use('/stat', isAuth, require('./routes/stat'))

gameSocket(io)

http.listen(process.env.PORT || 3000, () => {
  console.log(`Battleship app listening on port ${process.env.PORT || 3000}!`)
})
