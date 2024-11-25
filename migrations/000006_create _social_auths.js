const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('social_auths', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      provider_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true }
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: true 
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('social_auths')
  }
}