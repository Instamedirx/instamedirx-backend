const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('roles', {
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
    })

    await queryInterface.bulkInsert('roles', [
      {
        name: 'client'
      },
      {
        name: 'pharmacist'
      },
      {
        name: 'doctor'
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('roles')
  }
}