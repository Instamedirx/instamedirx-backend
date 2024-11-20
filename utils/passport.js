const passport = require('passport')
const { User } = require('../models')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// const users = [
//   { id: 1, username: 'emmasela', password: 'TormEmma@2004?' },
//   { id: 2, username: 'tormgibbs', password: 'pA55wrd@123?' },
// ]

passport.use(new LocalStrategy(async (username, password, done) => {
  // const user = users.find(
  //   (u) => u.username === username && u.password === password
  // )
  // if (user) {
  //   return done(null, user)
  // } else {
  //   return done(null, false, { message: 'invalid credentials' })
  // }

  const user = await User.findOne({ where: { username } })
  if (!user) {
    return done(null, false, { message: 'incorrect username or password' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return done(null, false, { message: 'incorrect username or password' })
  }
  return done(null, user)
}))


passport.serializeUser((user, done) => done(null, user.id))


passport.deserializeUser(async (id, done) => {
  // const user = users.find(u => u.id === id)
  // done(null, user)
  const user = await User.findByPk(id)

  if (!user) {
    return done(new Error('User not found'), null)  // If user is not found, return an error
  }

  done(null, user)
})

module.exports = passport
