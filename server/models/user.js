const mongoose = require('mongoose')

const Schema = mongoose.Schema
const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', User)
