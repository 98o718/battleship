const express = require('express')
const router = express.Router()

const { updateRating } = require('./../services/statService')

const User = require('./../models/user')

router.get('/', async (req, res) => {})

router.get('/rating', async (req, res) => {
  const { id } = res.locals.auth

  User.findById(id, (err, user) => {
    if (err || !user)
      return res.json({ status: false, message: 'Пользователь не найден' })

    return res.json({ status: true, rating: user.rating })
  })
})

module.exports = router
