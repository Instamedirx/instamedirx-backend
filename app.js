const express = require('express')
require('express-async-errors')
const app = express()
const passport = require('./utils/passport')
const session = require('express-session')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')


app.use(session({
  secret: 'secret', // will change later
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)


module.exports = app