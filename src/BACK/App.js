// Importaciones
const { getPoolConnection } = require('./connectionDB.js')
const express = require('express')
const app = express()
require('dotenv').config()
// Variables de entorno
const PORT = process.env.HOST_PORT

app.use(express.json())

// Primero que nos devuelva lo que tenga en la base de datos para mostrarlo en la pantalla
app.get('/', async (req, res) => {
  const pool = await getPoolConnection()

  const [recetas] = await pool.query('SELECT * FROM recetas')

  res.status(200).json({ recetas })
})

app.listen(PORT, () => {
  console.log('Server listening...')
})
