const { handleJsonError, handleSequelizeError } = require('./errors')
const jwt = require('jsonwebtoken')

const ensureAuthenticated = async (request, response, next) => {
  if (request.isAuthenticated()) return next()
  
  const token = request.headers['authorization']?.split(' ')[1]

  if (token) {
    const decoded = jwt.verify(token, 'jwt-secret')
    request.user = decoded
    return next()
  }
  
  return response.status(401).json({ error: 'you must be authenticated to access this resource'})
}

const errorHandler = async (error, request, response, next) => {
  switch (error.name) {
  case 'SyntaxError':
    return handleJsonError(response)
  case 'SequelizeUniqueConstraintError':
    return handleSequelizeError(error, response)
  default:
    next(error)
  }
}

module.exports = {
  ensureAuthenticated,
  errorHandler
}