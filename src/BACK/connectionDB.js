const mysql = require('mysql2')

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DD_USER,
  database: 'recetario',
  password: process.env.DB_PASSWORD,
  timezone: 'local'
}

let pool

const getPoolConnection = async () => {
  if (!pool) {
    pool = await mysql.getPoolConnection(dbConfig)
  }

  return pool
}

module.exports = { getPoolConnection }
