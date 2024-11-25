const  router = require('express').Router()
const passport = require('../utils/passport')
const { User, Role, Token } = require('../models')
const { Validator } = require('../validators/validator')
const { MOBILE_SCHEME, FRONTEND_URL } = require('../utils/config')
const { SCOPE_ACTIVATION } = require('../models/token')
const { sendActivationEmail } = require('../services/emailService')


router.post('/send-verification-email', async (request, response) => {
  const { email } = request.body

  if (!email) {
    return response.status(422).json({ email: 'must be provided'})
  }

  const user = await User.findOne({ where: { email }})

  if (!user) {
    return response.status(422).json({ email: 'no matching email address found'})
  }

  if (user.activated) {
    return response.status(422).json({ email: 'user has already been activated'})
  }

  const activationToken = await Token.generateToken(
    user.id, 
    24 * 60 * 60 * 1000, 
    SCOPE_ACTIVATION
  )

  try {
    await sendActivationEmail(user.email, activationToken.plaintext)
    response.json({message: 'an email will be sent to you containing activation instructions'})
    
  } catch (error) {
    response.status(500).json({ error: 'something happened'})
    console.log('error',error)
  }
  
})

router.put('/verify',  async (request, response) => {
  const { token } = request.body

  if (!token) {
    return response.status(422).json({ token: 'must be provided'})
  }

  const user = await User.getForToken(SCOPE_ACTIVATION, token)

  console.log(user)

  if (!user) {
    return response.status(422).json({ token: 'invalid or expired activation token'})
  }

  user.activated = true
  
  await user.save()

  response.json({user: user})

})


router.post('/register', async (request, response) => {
  const { email, password, firstName, lastName, role } = request.body

  const validator = new Validator()

  const userToValidate = {
    email,
    password,
    firstName,
    lastName,
    role
  }

  User.validateUser(validator, userToValidate)

  if (!validator.valid()) {
    return response.status(400).json({ errors: validator.getErrors() })
  }

  const userRole = await Role.findOne({
    where: { name: role }
  })

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    roleId: userRole.dataValues.id
  })

  response.status(201).json(user)
})

router.post('/login', async (request, response, next) => {
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