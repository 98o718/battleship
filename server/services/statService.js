const User = require('./../models/user')

const eloRank = require('elo-rank')
const elo = new eloRank(50)

const updateRating = async (winner, loser) => {
  const win = await User.findOne({ username: winner })
  const lose = await User.findOne({ username: loser })

  if (!win || !lose) return false

  let expectedScoreA = elo.getExpected(win.rating, lose.rating)
  let expectedScoreB = elo.getExpected(lose.rating, win.rating)

  playerA = elo.updateRating(expectedScoreA, 1, win.rating)
  playerB = elo.updateRating(expectedScoreB, 0, lose.rating)

  if (playerB < 0) playerB = 0

  win.rating = playerA
  lose.rating = playerB

  await win.save()
  await lose.save()

  return { winner: win.rating, loser: lose.rating }
}

module.exports = {
  updateRating,
}
