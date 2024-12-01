const  router = require('express').Router()
const { User, Role } = require('../models')
const completeProfile = require('../services/completeProfile')
const { ensureAuthenticated } = require('../utils/middleware')


router.get('/:id', async (request, response) => {
  const user = await User.findByPk(request.params.id)
  response.json(user)
})

router.post('/complete-profile', ensureAuthenticated, async (request, response) => {
  const user = await User.findByPk(request.user.id, {
    include: {
      model: Role,
      attributes: ['name']
    }
  })

  if (!user.setRole) {
    return response.status(403).send({ error: 'role not set'})
  }

  if (user.role.name !== 'doctor' && user.role.name !== 'pharmacist') {
    return response.status(403).send({ error: 'profile completion is not required for clients'})
  }

  try {
    await completeProfile(request.body, request.user.id)
    response.status(201).send({ message: 'profile created successfully'})
  } catch (error) {
    response.status(500).send({ error: 'something happened'})
    console.log(error)
  }  
})


module.exports = router