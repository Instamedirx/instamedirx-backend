const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const bcrypt = require('bcrypt')



class User extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password)
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
    allowNull: false,
    references: { model: 'roles', key: 'id' },
  }
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
  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)
})


module.exports = User