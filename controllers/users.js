const  router = require('express').Router()
const { User } = require('../models')
const completeProfile = require('../services/completeProfile')


router.get('/:id', async (request, response) => {
  const user = await User.findByPk(request.params.id)
  response.json(user)
})

router.post('/complete-profile', async (request, response) => {
  if (!request.user) {
    return response.status(401).send({ error: 'you must be authenticated to access this resource' })
  }

  if (request.user.role.name !== 'doctor' && request.user.role.name !== 'pharmacist') {
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