const passport = require('passport')
const crypto = require('crypto')
const { User, Role, SocialAuth } = require('../models')
const bcrypt = require('bcrypt')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy


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

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)

  // Check if the user already exists
  let user = await User.findOne({ where: { email: profile.emails[0].value } })

  if (!user) {
    const randomPassword = crypto.randomBytes(20).toString('hex')
    const hashedPassword = await bcrypt.hash(randomPassword, 10)
    
    user = await User.create({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      password: hashedPassword
    })


    // Link the social authentication provider (Google)
    await SocialAuth.create({
      userId: user.id,
      providerUserId: profile.id,
      provider: 'google',
      email: profile.emails[0].value,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  } else {
    // If the user exists, check if their social auth is linked
    const socialAuth = await SocialAuth.findOne({
      where: { user_id: user.id, provider: 'google' },
    })

    if (!socialAuth) {
      // If not, link the new social login
      await SocialAuth.create({
        user_id: user.id,
        provider_user_id: profile.id,
        provider: 'google',
        email: profile.emails[0].value,
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    }

    if (accessToken !== socialAuth.accessToken || refreshToken !== socialAuth?.refreshToken) {
      await socialAuth.update({
        accessToken,
        refreshToken
      })
    }
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


// console.log(profile)
//   const user = {
//     id: profile.id,
//     email: profile.emails[0].value,
//     name: profile.displayName,
//     provider: 'google'
//   }
//   console.log('user',user)
//   console.log('accessToken',accessToken)
//   console.log('refreshToken',refreshToken)
