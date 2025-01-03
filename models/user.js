const { Model, DataTypes } = require('sequelize')
const crypto = require('crypto')
const { sequelize } = require('../utils/db')
const bcrypt = require('bcrypt')
const { Validator } = require('../validators/validator')
const { Token } = require('./token')
const { Op } = require('sequelize')



class User extends Model {
  static async getForToken(scope, token) {
    const hash = crypto.createHash('sha256').update(token).digest('hex')
    const tokenRecord = await Token.findOne({
      where: {
        hash,
        scope,
        expiry: {
          [Op.gt]: new Date(), 
        },
      },
      include: User,
    })


    if (!tokenRecord) {
      console.log('Token not found, expired, or invalid.')
      return null
    }

    return tokenRecord.user
  }

  async validatePassword(password) {
    console.log(password, this.password)
    return bcrypt.compare(password, this.password)
  }

  static validateEmail(validator, email) {
    validator.check(typeof email !== 'undefined' && email !== null, 'email', 'must be provided')
    if (email) {
      validator.check(Validator.isValidEmail(email), 'email', 'must be a valid email address')
    }
  }

  static validatePassword(validator, password) {
    validator.check(typeof password !== 'undefined' && password !== null, 'password', 'must be provided')
    if (password) {
      validator.check(password.length >= 8, 'password', 'must be at least 8 characters long')
      validator.check(password.length <= 72, 'password', 'must not be more than 72 characters long')
    }
  }

  static validateRole(validator, role) {
    validator.check(typeof role !== 'undefined' && role !== null, 'role', 'must be provided')

    if (role) {
      validator.check(Validator.in(role, 'client', 'doctor', 'pharmacist'), 'role', 'invalid role value')
    }
  }

  static validateUser(validator, user) {
    console.log(user)
    validator.check(user && typeof user === 'object', 'user', 'invalid or missing user data')

    validator.check(
      typeof user.firstName !== 'undefined' && user.firstName !== null, 'firstName', 'must be provided'
    )
    if (user.firstName) {
      validator.check(user.firstName.length <= 500, 'firstName', 'must not be more than 500 characters long')
    }

    validator.check(
      typeof user.lastName !== 'undefined' && user.lastName !== null, 'lastName', 'must be provided'
    )
    if (user.lastName) {
      validator.check(user.lastName.length <= 500, 'lastName', 'must not be more than 500 characters long')
    }

    User.validateEmail(validator, user.email)
    User.validatePassword(validator, user.password)
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: { model: 'roles', key: 'id' },
  },
  roleSet: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['password']}
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  }
})

User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
  }
})


module.exports = User