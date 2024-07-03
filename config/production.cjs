/* eslint-disable */
const { config } = require('dotenv')

config()

module.exports = {
  db: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME
  },
  server: {
    port: process.env.PORT
  },
  tk: {
    secret: process.env.TK_SEC,
    exp: '15m'
  },
  refresh_tk: {
    secret: process.env.REFRESH_TK_SEC,
    exp: '7d'
  },
  crypto: {
    secret: process.env.CRYPTO_SEC
  },
  cookie: {
    secure: true
  },
  logger: process.env.LOGGER_OPTION
}
  