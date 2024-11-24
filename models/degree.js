const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Degree extends Model {}

Degree.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'professionals', key: 'id' },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  document_proof: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'degree'
})

module.exports = Degree