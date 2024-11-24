const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Professional extends Model {}

Professional.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  facilityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facilityAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateProvince: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ethnicity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spokenLanguages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  medicalLicenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  specialities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'professional'
})

module.exports = Professional