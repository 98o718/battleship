const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')

const db = require('./../db')
const config = require('./../config')
const mailer = require('./../mailer')
const { countWins } = require('../services/statService')

const User = require('./../models/user')

router.get('/check', (req, res) => {
  const authorization = req.headers['authorization']
  if (!authorization) {
    return res.status(401).json({
      status: false,
    })
  }

  const a = authorization.split(' ')
  if (a[0] === 'Bearer' && a[1]) {
    const token = a[1]
    jwt.verify(token, config.jwt.secret, err => {
      if (err) {
        return res.status(401).json({
          status: false,
        })
      } else {
        return res.json({
          status: true,
        })
      }
    })
  } else {
    return res.status(401).json({
      status: false,
    })
  }
})

router.post('/login', (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()

  if (!validator.validate(email)) {
    return res.status(400).json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  User.findOne({ email }, (err, user) => {
    if (err || user === null) {
      return res.status(400).json({
        status: false,
        message: 'Неверный логин или пароль',
      })
    }

    bcrypt.compare(password, user.password, async (err, compare) => {
      if (!err && compare) {
        const payload = {
          id: user.id,
          username: user.username,
          email,
        }

        const token = jwt.sign(payload, config.jwt.secret)

        const counts = await countWins(user.id)

        res.json({
          status: true,
          username: user.username,
          rating: user.rating,
          token,
          counts,
        })
      } else {
        return res.status(400).json({
          status: false,
          message: 'Неверный логин или пароль',
        })
      }
    })
  })
})

router.post('/sign-up', async (req, res) => {
  let { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()
  username = username.trim()

  if (!validator.validate(email)) {
    return res.status(400).json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  const count1 = await User.find({ email }).countDocuments()
  if (count1 > 0) {
    return res.status(400).json({
      status: false,
      message: 'Email уже зарегистрирован',
    })
  }

  const count2 = await User.find({ username }).countDocuments()
  if (count2 > 0) {
    return res.status(400).json({
      status: false,
      message: 'Логин уже зарегистрирован',
    })
  }

  const salt = await bcrypt.genSalt(parseInt(config.bcrypt.saltRounds))
  const passwordHashed = await bcrypt.hash(password, salt)

  const user = new User({
    email,
    username,
    password: passwordHashed,
  })

  user.save(err => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Не удалось зарегистрироваться',
      })
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    }

    const token = jwt.sign(payload, config.jwt.secret)

    return res.json({
      status: true,
      token,
      rating: user.rating,
    })
  })
})

router.post('/forgot', async (req, res) => {
  let { email } = req.body

  if (!email) {
    return res.status(400).json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()

  if (!validator.validate(email)) {
    return res.status(400).json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  User.findOne({ email }, async (err, user) => {
    if (err || user === null) {
      return res.status(400).json({
        status: false,
        message: 'Пользователь не найден',
      })
    }

    const payload = {
      id: user.id,
      email: user.email,
      createdAt: Date.now(),
    }

    const token = jwt.sign(payload, user.password)
    const url = config.app.url + '/auth/forgot/' + token
    const text =
      'Уважаемый ' +
      user.username +
      '. Для вашего аккаунта в Battleship было запрошено восстановление пароля. Если это были вы, то перейдите по ссылке ниже.\n\n' +
      url +
      '\n\nИначе просто проигнорируйте это сообщение. С уважением, команда Battleship.'

    await mailer.sendMail({
      from: 'battleship@macaroni.studio',
      to: user.email,
      subject: 'Восстановление пароля',
      text,
    })

    return res.json({
      status: true,
      message: 'Ссылка отправлена на email',
    })
  })
})

router.get('/forgot/:token', async (req, res) => {
  const { token } = req.params

  const json = jwt.decode(token)
  if (!json)
    return res.status(400).json({
      status: false,
      message: 'Ссылка недействительная',
    })

  User.findById(json.id, (err, user) => {
    if (err || user === null) {
      return res.status(400).json({
        status: false,
        message: 'Ссылка недействительна',
      })
    }

    jwt.verify(token, user.password, async err => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Ссылка уже использована или недействительна',
        })
      }

      if (Date.now() - json.createdAt > 86400) {
        return res.status(400).json({
          status: false,
          message: 'Ссылка устарела',
        })
      }

      const password = Math.random()
        .toString(36)
        .substring(2, 15)

      const salt = await bcrypt.genSalt(parseInt(config.bcrypt.saltRounds))
      user.password = await bcrypt.hash(password, salt)
      user.save(async err => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: 'Не удалось изменить пароль',
          })
        }

        const text =
          'Уважаемый ' +
          user.username +
          '. Пароль в Battleship был сброшен.\n\nВаши новые данные для входа:\nEmail: ' +
          user.email +
          '\nПароль: ' +
          password +
          '\n\nС уважением, команда Battleship.'

        await mailer.sendMail({
          from: config.smtp.username,
          to: user.email,
          subject: 'Пароль сброшен',
          text,
        })

        return res.json({
          status: true,
          message: 'Пароль успешно сброшен',
        })
      })
    })
  })
})

module.exports = router
