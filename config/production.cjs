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
  logger: process.env.LOGGER_OPTION
}
  