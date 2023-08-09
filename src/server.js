// Importaciones
const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

app.get('/',  (req, res) => {
  console.log('funciona')
  res.send('funciona')
})

app.listen(PORT, () => {
  console.log('Server listening...')
})
