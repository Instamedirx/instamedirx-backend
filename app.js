const express = require('express')
const app = express()
const passport = require('./utils/passport')
const session = require('express-session')
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes)





module.exports = app