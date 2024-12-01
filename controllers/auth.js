const router = require('express').Router()
const passport = require('../utils/passport')
const jwt = require('jsonwebtoken')
const { User, Role, Token } = require('../models')
const { Validator } = require('../validators/validator')
const { MOBILE_SCHEME, FRONTEND_URL } = require('../utils/config')
const { SCOPE_ACTIVATION } = require('../models/token')
const { sendActivationEmail } = require('../services/emailService')
const { ensureAuthenticated } = require('../utils/middleware')
const { generateAccessToken, generateRefreshToken } = require('../utils/helper')


router.put('/set-role', ensureAuthenticated, async (request, response) => {
  const { role } = request.body
  const user = request.user

  const validator = new Validator()

  User.validateRole(validator, role)

  if (!validator.valid()) {
    return response.status(422).json({ errors: validator.getErrors() })
  }

  if (user.roleSet) {
    return response.status(403).json({ error: 'role cannot be changed after being set' })
  }

  const userRole = await Role.findOne({
    where: { name: role }
  })

  user.roleId = userRole.id
  user.roleSet = true
  await user.save()

  return response.status(200).json({ message: 'role set successfully' })
})

router.post('/request-verification', async (request, response) => {
  const { email } = request.body

  const validator = new Validator()

  User.validateEmail(validator, email)

  if (!validator.valid()) {
    return response.status(422).json({ errors: validator.getErrors() })
  }

  const user = await User.findOne({ where: { email }})

  if (!user) {
    validator.addError('email', 'no matching email address found')
    return response.status(422).json({ errors: validator.getErrors() })
  }

  if (user.activated) {
    validator.addError('email', 'user has already been activated')
    return response.status(422).json({ errors: validator.getErrors() })
  }

  const activationToken = await Token.generateToken(
    user.id, 
    24 * 60 * 60 * 1000, 
    SCOPE_ACTIVATION
  )

  sendActivationEmail(user.email, activationToken.plaintext)

  response.json({message: 'an email will be sent to you containing activation instructions'})
})

router.put('/verify-email',  async (request, response) => {
  const { token } = request.body

  const validator = new Validator()

  Token.validateToken(validator, token)

  if (!validator.valid()) {
    return response.status(422).json({ errors: validator.getErrors() })
  }

  const user = await User.getForToken(SCOPE_ACTIVATION, token)


  if (!user) {
    validator.addError('token', 'invalid or expired activation token')
    return response.status(422).json({ errors: validator.getErrors() })
  }

  user.activated = true
  
  await user.save()

  await Token.deleteAllForUser(SCOPE_ACTIVATION, user.id)

  response.json({
    message: 'email verified successfully',
    user: user
  })

})


router.post('/register', async (request, response) => {
  const { email, password, firstName, lastName } = request.body

  const validator = new Validator()

  const userToValidate = {
    email,
    password,
    firstName,
    lastName,
  }

  User.validateUser(validator, userToValidate)

  if (!validator.valid()) {
    return response.status(422).json({ errors: validator.getErrors() })
  }


  const user = await User.create({
    email,
    password,
    firstName,
    lastName
  })

  const userResponse = user.toJSON()
  delete userResponse.password

  const activationToken = await Token.generateToken(
    user.id, 
    24 * 60 * 60 * 1000, 
    SCOPE_ACTIVATION
  )

  sendActivationEmail(user.email, activationToken.plaintext)

  response.status(201).json({
    message: 'User registered successfully. Please check your email to verify your account.',
    user: userResponse
  })
})

router.post('/login', async (request, response, next) => {

  const platform = request.query.platform


  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
      
    if (!user) {
      return response.status(401).json({ error: info.message || 'invalid username or password' })
    }

    if (platform === 'mobile') {
      const accessToken  = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      
      response.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })


      return response.status(200).json({ message: 'login successful', accessToken })
    }

    request.logIn(user, (err) => {
      if (err) return next(err)
      return response.status(200).json({ message: 'login successful' })
    })
  })(request, response, next)
})

router.post('/refresh', async (request, response) => {
  const refreshToken = request.cookies.refresh_token

  if (!refreshToken) {
    return response.status(401).json({ error: 'refresh token not found, please log in' })
  }

  jwt.verify(refreshToken, 'jwt-refresh-secret', (error, decoded) => {
    if (error) {
      return response.status(403).json({ message: 'Invalid refresh token' })
    }

    const newAccessToken = generateAccessToken({ id: decoded.id })

    return response.status(200).json({ accessToken: newAccessToken })
  })
})



router.get('/google', (request, response, next) => {
  const platform = request.query.platform
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: platform
  })(request, response, next)
})

router.get('/google/callback', passport.authenticate('google'),
  (request, response) => {
    const platform = request.query.state

    if (platform == 'mobile') {
      response.redirect(`${MOBILE_SCHEME}://oauth?authenticated=true`)
    } else {
      response.redirect(`${FRONTEND_URL}/auth/success`)
    }
  }
)


module.exports = router