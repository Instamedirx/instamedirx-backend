const { DataTypes } = require('sequelize')


module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.createTable('degrees', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      professional_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'professionals',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      title: {
        type: DataTypes.STRING,
      },
      institution: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      document_proof: {
        type: DataTypes.STRING,
      }
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable('degrees')
  }
}