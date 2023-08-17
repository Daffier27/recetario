const { getPoolConnection } = require('../connectionDB.js')
const createError = require('../../../helpers/defaultError.js')
const { v4: uuidv4 } = require('uuid')

async function postHome (req, res, next) {
  try {
    const id = uuidv4()
    const { name, ingredients, persons, description } = req.body

    const pool = await getPoolConnection()
    const recetas = await pool.query('SELECT * FROM recetas')

    const repeatName = recetas[0].filter((e) => {
      return e.nombre.toLowerCase() === name.toLowerCase()
    })

    if (repeatName.length > 0) {
      throw createError(400, 'Ya existe una receta con este nombre. Introduce un nombre diferente.')
    }

    await pool.query(
      'INSERT INTO recetas (id, nombre, ingredientes, comensales, descripcion) VALUES (?, ?, ?, ?, ?)',
      [id, name, ingredients, persons, description]
    )

    res.status(200).send('Receta agregada con éxito')
  } catch (error) {
    next(error)
  }
}

module.exports = postHome
