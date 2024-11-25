const passport = require('passport')
const { User, Role } = require('../models')
const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  const user = await User.scope('withPassword').findOne({ where: { email } }) 
  if (!user) {
    return done(null, false, { message: 'incorrect email or password' })
  }

  const isMatch = await user.validatePassword(password)

  if (!isMatch) {
    return done(null, false, { message: 'incorrect email or password' })
  }
  
  return done(null, user) 
}))


passport.serializeUser((user, done) => done(null, user.id))


passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id, {
    include: {
      model: Role,
      attributes: ['name']
    }
  })

  if (!user) {
    return done(new Error('User not found'), null) 
  }

  done(null, user)
})

module.exports = passport
