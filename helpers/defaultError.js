function createError (statusCode, errorMessage) {
  const error = new Error(errorMessage)
  error.code = statusCode
  return error
}

module.exports = createError
