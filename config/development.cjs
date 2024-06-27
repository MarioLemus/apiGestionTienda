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
  logger: 'dev'
}
