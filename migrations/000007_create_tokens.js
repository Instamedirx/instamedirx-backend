const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('tokens', {
      hash: {
        type: DataTypes.BLOB,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('tokens')
  }
}