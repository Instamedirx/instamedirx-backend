const passport = require('../utils/passport')

const login = (request, response, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
      
    if (!user) {
      return response.status(401).json({ error: info.message || 'Login Failed' })
    }
    request.logIn(user, (err) => {
      if (err) return next(err)

      return response.status(200).json({ message: 'Login successful', user })
    })
  })(request, response, next)
}


module.exports = { login }