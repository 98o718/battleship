const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')

const db = require('./../db')
const config = require('./../config')
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

module.exports = router
