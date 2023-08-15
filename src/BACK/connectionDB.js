require('dotenv').config()

const mysql = require('mysql2/promise')

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'recetario'
}

let pool

const getPoolConnection = async () => {
  if (!pool) {
    pool = await mysql.createPool(dbConfig)
  }

  return pool
}

module.exports = { getPoolConnection }
