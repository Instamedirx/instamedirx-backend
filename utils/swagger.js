const swaggerJSDoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Instamedirx API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./controllers/*.js'], 
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)


module.exports = swaggerSpec