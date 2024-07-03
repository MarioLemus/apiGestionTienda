/* eslint-disable */
const { config } = require('dotenv')

config()

module.exports = {
  db: {
    uri: 'mongodb://localhost:27017',
    name: 'mitienda'
  },
  server: {
    port: 3000
  },
  tk: {
    secret: 'mitiendasecret',
    exp: '15m'
  },
  refresh_tk: {
    secret: 'mitiendaserefreshsecret',
    exp: '7d'
  },
  crypto: {
    secret: 'mitienda_901234567890123_ejemplo'
  },
  cookie: {
    secure: false
  },
  logger: 'dev'
}
