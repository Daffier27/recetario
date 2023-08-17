const getAllEntries = require('../controllers/getAllEntries.js')
const postHome = require('../controllers/postHome.js')
const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/', getAllEntries)

homeRouter.post('/', postHome)

module.exports = {
  homeRouter
}
