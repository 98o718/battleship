const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Stat = new Schema(
  {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    loser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Stat', Stat)
