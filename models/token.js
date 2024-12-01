const { Model, DataTypes } = require('sequelize')
const crypto = require('crypto')
const { sequelize } = require('../utils/db')

const SCOPE_ACTIVATION = 'activation'
const SCOPE_AUTHENTICATION = 'authentication'
const SCOPE_PASSWORD_RESET = 'password-reset'

class Token extends Model {
  static async generateToken(userId, ttl, scope) {
    const plaintext = crypto.randomInt(100000, 1000000).toString()
    const hash = crypto.createHash('sha256').update(plaintext).digest('hex')
    const expiry = new Date(Date.now() + ttl)

    const token = await Token.create({
      hash,
      userId,
      expiry,
      scope
    })
    
    token.plaintext = plaintext
    return token
  }

  static validateToken(validator, token) {
    validator.check(typeof token !== 'undefined' && token !== null, 'token', 'must be provided')
    if (token) {
      validator.check(token.length == 6, 'token', 'must be at 6 characters long')
    }
  }

  static async deleteAllForUser(scope, userId) {
    await Token.destroy({
      where: { scope, userId}
    })
  }
}

Token.init({
  hash: {
    type: DataTypes.BLOB,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  scope: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'token'
})

module.exports = {
  Token,
  SCOPE_ACTIVATION,
  SCOPE_AUTHENTICATION,
  SCOPE_PASSWORD_RESET
}