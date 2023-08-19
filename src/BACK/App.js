// Importaciones
const { homeRouter } = require('./router/homeRouter.js')
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
// Variables de entorno
const PORT = process.env.HOST_PORT

app.use(cors())

app.use(express.json())

app.use('/', homeRouter)

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Error interno del servidor'

  console.error(`Error ${statusCode}: ${message}`)
  res.status(statusCode).json({ error: message })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
