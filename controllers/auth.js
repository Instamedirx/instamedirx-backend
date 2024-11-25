const  router = require('express').Router()
const passport = require('../utils/passport')
const { User, Role } = require('../models')
const { Validator } = require('../validators/validator')


router.post('/auth/register', async (request, response) => {
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
    console.log(validator.errors)
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

router.post('/auth/login', async (request, response, next) => {
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

// const login = (request, response, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err)
      
//     if (!user) {
//       return response.status(401).json({ error: info.message || 'invalid username or password' })
//     }

//     request.logIn(user, (err) => {
//       if (err) return next(err)
      
//       const {username} = user
//       return response.status(200).json({ message: 'Login successful', user: username })
//     })
//   })(request, response, next)
// }

// const createUser = async (request, response) => {
//   const { email, password, firstName, lastName, role } = request.body

//   const validator = new Validator()

//   const userToValidate = {
//     email,
//     password,
//     firstName,
//     lastName,
//     role
//   }

//   User.validateUser(validator, userToValidate)

//   if (!validator.valid()) {
//     console.log(validator.errors)
//     return response.status(400).json({ errors: validator.getErrors() })
//   }

//   const userRole = await Role.findOne({
//     where: { name: role }
//   })

//   console.log(userRole.dataValues.id)

//   const user = await User.create({
//     email,
//     password,
//     firstName,
//     lastName,
//     roleId: userRole.dataValues.id
//   } )
//   response.status(201).json(user)
// }


module.exports = router