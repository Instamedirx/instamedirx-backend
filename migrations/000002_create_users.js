const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
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
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: { model: 'roles', key: 'id' },
      },
      role_set: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
  }
}