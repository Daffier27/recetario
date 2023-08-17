// Importaciones
const { getPoolConnection } = require('./connectionDB.js')
const { defaultError } = require('./defaultError.js')
const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
require('dotenv').config()
// Variables de entorno
const PORT = process.env.HOST_PORT

app.use(express.json())

// Primero que nos devuelva lo que tenga en la base de datos para mostrarlo en la pantalla
app.get('/', async (req, res, next) => {
  try {
    const pool = await getPoolConnection()

    const [recetas] = await pool.query('SELECT * FROM recetas')

    res.status(200).json({ recetas })
  } catch (error) {
    next(error)
  }
})

// Añadir elementos a la base de
app.post('/', async (req, res, next) => {
  try {
    const id = uuidv4()
    const { name, ingredients, persons, description } = req.body

    const pool = await getPoolConnection()
    await pool.query(
      'INSERT INTO recetas (id, nombre, ingredientes, comensales, descripcion) VALUES (?, ?, ?, ?, ?)',
      [id, name, ingredients, persons, description]
    )

    res.status(200).send('Receta agregada con exito')
  } catch (error) {
    next(error)
  }
})
app.use((error, req, res, next) => {
  console.log(error)
  defaultError(error)
})

app.listen(PORT, () => {
  console.log('Server listening...')
})
