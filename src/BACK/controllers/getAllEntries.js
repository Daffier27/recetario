const { getPoolConnection } = require('../connectionDB.js')
const createError = require('../../../helpers/defaultError.js')

async function getHome (req, res, next) {
  try {
    const pool = await getPoolConnection()

    const [recetas] = await pool.query('SELECT * FROM recetas')

    if (recetas.length === 0) {
      throw createError(404, 'Introduce entradas')
    }

    res.status(200).json({ recetas })
  } catch (error) {
    next(error)
  }
}

module.exports = getHome
