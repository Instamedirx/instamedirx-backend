const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const users = [
  { id: 1, username: 'emmasela', password: 'TormEmma@2004?' },
  { id: 2, username: 'tormgibbs', password: 'pA55wrd@123?' },
]

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  )
  if (user) {
    return done(null, user)
  } else {
    return done(null, false, { message: 'invalid credentials' })
  }
}))


passport.serializeUser((user, done) => done(null, user.id))


passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id)
  done(null, user)
})

module.exports = passport
