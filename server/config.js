require('dotenv').config()

const app = {
  url: process.env.APP_URL,
}

const db = {
  url: process.env.DB_URL,
}

const bcrypt = {
  saltRounds: process.env.BCRYPT_SALT,
}

const jwt = {
  secret: process.env.JWT_SECRET,
}

const smtp = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
}

module.exports = {
  app,
  db,
  bcrypt,
  smtp,
  jwt,
}
