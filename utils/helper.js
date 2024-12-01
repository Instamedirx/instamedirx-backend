const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  const payload = { id: user.id, email: user.email }
  const secret = 'jwt-secret'
  const options =  { expiresIn: '1h' }

  return jwt.sign(payload, secret, options)
}


const generateRefreshToken = (user) => {
  const payload = { id: user.id }
  const secret = 'jwt-refresh-secret'
  const options = { expiresIn: '7d' }

  return jwt.sign(payload, secret, options)
}


module.exports = {
  generateAccessToken,
  generateRefreshToken
}