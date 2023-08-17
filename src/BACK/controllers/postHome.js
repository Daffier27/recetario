const { getPoolConnection } = require('../connectionDB.js')
const { v4: uuidv4 } = require('uuid')

async function postHome (req, res, next) {
  try {
    const id = uuidv4()
    const { name, ingredients, persons, description } = req.body

    const pool = await getPoolConnection()
    const recetas = await pool.query('SELECT * FROM recetas')

    // const repeatName = recetas[0].filter((e) => {
    //   return e.nombre === name
    // })

    // if(repeatName){
    //   return
    // }
    await pool.query(
      'INSERT INTO recetas (id, nombre, ingredientes, comensales, descripcion) VALUES (?, ?, ?, ?, ?)',
      [id, name, ingredients, persons, description]
    )

    res.status(200).send('Receta agregada con exito')
  } catch (error) {
    next(error)
  }
}

module.exports = postHome
