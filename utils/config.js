require('dotenv').config()

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
  PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
}