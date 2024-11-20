const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')
const bcrypt = require('bcrypt')

// const UserType = {
//   CLIENT: 'client',
//   DOCTOR: 'doctor',
//   PHARMACIST: 'pharmacist'
// }

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  // modelName: 'User',
  // tableName: 'users',
  // timestamps: false
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

User.beforeCreate(async (user) => {
  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)
})


module.exports = User