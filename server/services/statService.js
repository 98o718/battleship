const eloRank = require('elo-rank')
const elo = new eloRank(50)

const User = require('./../models/user')
const Stat = require('./../models/stat')

const updateRating = async (winner, loser) => {
  const win = await User.findOne({ username: winner })
  const lose = await User.findOne({ username: loser })

  if (!win || !lose || winner === loser) return false

  let expectedScoreA = elo.getExpected(win.rating, lose.rating)
  let expectedScoreB = elo.getExpected(lose.rating, win.rating)

  playerA = elo.updateRating(expectedScoreA, 1, win.rating)
  playerB = elo.updateRating(expectedScoreB, 0, lose.rating)

  if (playerB < 0) playerB = 0

  win.rating = playerA
  lose.rating = playerB

  const stat = new Stat({
    winner: win.id,
    loser: lose.id,
  })

  await stat.save()
  await win.save()
  await lose.save()

  return { winner: win.rating, loser: lose.rating }
}

const countWins = async id => {
  const wins = await Stat.find({ winner: id }).countDocuments()
  const loss = await Stat.find({ loser: id }).countDocuments()

  return { wins, loss }
}

module.exports = {
  updateRating,
  countWins,
}
