const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')

const db = require('./../db')
const config = require('./../config')
const mailer = require('./../mailer')

const User = require('./../models/user')

router.post('/login', (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    return res.json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()

  if (!validator.validate(email)) {
    return res.json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  User.findOne({ email }, (err, user) => {
    if (err || user === null) {
      return res.json({
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

        res.json({
          status: true,
          token,
        })
      }
    })
  })
})

router.post('/sign-up', async (req, res) => {
  let { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()
  username = username.trim()

  if (!validator.validate(email)) {
    return res.json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  const count1 = await User.find({ email }).countDocuments()
  if (count1 > 0) {
    return res.json({
      status: false,
      message: 'Email уже зарегистрирован',
    })
  }

  const count2 = await User.find({ username }).countDocuments()
  if (count2 > 0) {
    return res.json({
      status: false,
      message: 'Логин уже зарегистрирован',
    })
  }

  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds)
  const passwordHashed = await bcrypt.hash(password, salt)

  const user = new User({
    email,
    username,
    password: passwordHashed,
  })

  user.save(err => {
    if (err) {
      return res.json({
        status: false,
        message: 'Не удалось зарегистрироваться',
      })
    }

    return res.json({
      status: true,
    })
  })
})

router.post('/forgot', async (req, res) => {
  let { email } = req.body

  if (!email) {
    return res.json({
      status: false,
      message: 'Заполните все поля',
    })
  }

  email = email.trim().toLowerCase()

  if (!validator.validate(email)) {
    return res.json({
      status: false,
      message: 'Введите корректный email',
    })
  }

  User.findOne({ email }, async (err, user) => {
    if (err || user === null) {
      return res.json({
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
    const url = config.app.url + '/forgot/' + token
    const text =
      'Уважаемый ' +
      user.username +
      '. Для вашего аккаунта в Battleship было запрошено восстановление пароля. Если это были вы, то перейдите по ссылке ниже.\n\n' +
      url +
      '\n\nИначе просто проигнорируйте это сообщение.'

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

module.exports = router
