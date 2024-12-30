const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const passport = require('./utils/passport')
const session = require('express-session')
const middleware = require('./utils/middleware')
const swaggerUi = require('swagger-ui-express')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
// const swaggerSpec = require('./utils/swagger')
const swaggerDocument = require('./openapi.json')


app.use(session({
  secret: 'secret', // will change later
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)


module.exports = app