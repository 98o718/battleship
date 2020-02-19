require('dotenv').config()

const db = {
  url: process.env.DB_URL,
}

const bcrypt = {
  saltRounds: process.env.BCRYPT_SALT,
}

const jwt = {
  secret: process.env.JWT_SECRET,
}

module.exports = {
  db,
  bcrypt,
  jwt,
}
