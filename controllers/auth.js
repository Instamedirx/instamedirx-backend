const passport = require('../utils/passport')
const { User } = require('../models')

const login = (request, response, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
      
    if (!user) {
      return response.status(401).json({ error: info.message || 'invalid username or password' })
    }

    request.logIn(user, (err) => {
      if (err) return next(err)
      
      const {username} = user
      return response.status(200).json({ message: 'Login successful', user: username })
    })
  })(request, response, next)
}

const createUser = async (request, response) => {
  const { username, password } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required' })
  }

  if (password.length < 6) {
    return response.status(400).json({ error: 'Password must be at least 6 characters long' })
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'Username must be at least 3 characters long' })
  }



  try {
    const user = await User.create({
      username,
      password
    })
    response.status(201).json(user)
  } catch (error) {
    response.status(500).json({ error: `Failed to create user: ${error}`})
  }
}


module.exports = { login, createUser }