const express = require('express')
const router = express.Router()

const { countWins } = require('../services/statService')

const User = require('./../models/user')
const Stat = require('./../models/stat')

router.get('/', async (req, res) => {
  const { id } = res.locals.auth

  Stat.find({ $or: [{ winner: id }, { loser: id }] }, (err, stat) => {
    if (err || !stat) return res.json({ status: true, stat: [] })
    else {
      const stats = []
      stat.forEach(value => {
        stats.push({
          id: value.id,
          winner: value.winner.username,
          loser: value.loser.username,
          createdAt: value.createdAt,
        })
      })

      return res.json({ status: true, stat: stats })
    }
  })
    .populate('winner')
    .populate('loser')
})

router.get('/counts', async (req, res) => {
  const { id } = res.locals.auth

  const counts = await countWins(id)

  return res.json(counts)
})

router.get('/rating', async (req, res) => {
  const { id } = res.locals.auth

  User.findById(id, (err, user) => {
    if (err || !user)
      return res.json({ status: false, message: 'Пользователь не найден' })

    return res.json({ status: true, rating: user.rating })
  })
})

module.exports = router
