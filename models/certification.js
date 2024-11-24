const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Certification extends Model {}

Certification.init({
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
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  documentProof: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'certification'
})

module.exports = Certification