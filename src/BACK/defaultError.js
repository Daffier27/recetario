function defaultError (error, res, req, next) {
  let code = 500
  if (error.name === 'ValidationError') {
    code = 400
  }
  res.status(code).send({ message: error.message })
}

module.exports = { defaultError }
