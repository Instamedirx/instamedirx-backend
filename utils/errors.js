const handleJsonError = (response) => {
  return response.status(400).json({ error: 'body contains badly-formed JSON' })
}

const handleSequelizeError = (error, response) => {
  const validationError = error.errors?.[0]
  if (validationError?.type === 'unique violation' && validationError?.path === 'email') {
    return response.status(422).json({ email: 'A user with this email address already exists' })
  }
}


module.exports = {
  handleJsonError,
  handleSequelizeError
}
