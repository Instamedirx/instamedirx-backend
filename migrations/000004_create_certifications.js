const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('certifications', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      professional_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'professionals', key: 'id' },
        onDelete: 'CASCADE'
      },
      title: {
        type: DataTypes.STRING,
      },
      license_number: {
        type: DataTypes.STRING,
      },
      issue_date: {
        type: DataTypes.DATE,
      },
      document_proof: {
        type: DataTypes.STRING,
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('certifications')
  }
}