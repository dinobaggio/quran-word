require('dotenv').config()

const {
  DB_DRIVER,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env

module.exports = {
  "username": DB_USERNAME,
  "password": DB_PASSWORD,
  "database": DB_NAME,
  "host": DB_HOST,
  "dialect": DB_DRIVER || 'mysql',
  "port": DB_PORT || '3306',
  "logging": false
}
