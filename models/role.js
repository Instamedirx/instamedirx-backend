const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'role'
})

module.exports = Role