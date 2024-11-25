const express = require('express')
const router = express.Router()

const authRoutes = require('./auth')
const userRoutes = require('./users')

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

module.exports = router



// Here you would typically:
// 1. Check if user exists in your database
// 2. Create new user if they don't exist
// 3. Return user object