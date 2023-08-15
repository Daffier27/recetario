const { getPoolConnection } = require('./connectionDB.js')

const createDB = async () => {
  try {
    const pool = await getPoolConnection()

    await pool.query('CREATE DATABASE IF NOT EXISTS recetario;')
    await pool.query('USE recetario;')

    await pool.query(`CREATE TABLE recetas(
      id VARCHAR(50) PRIMARY KEY NOT NULL,
      nombre varchar(100) NOT NULL,
      comensales INT DEFAULT 2,
      descripcion TEXT NOT NULL
    )`)
    process.exit(0)
  } catch (error) {
    console.log(error)
  }
}

createDB()
