const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('professionals', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      facility_name: {
        type: DataTypes.STRING,
      },
      facility_address: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      state_province: {
        type: DataTypes.STRING,
      },
      ethnicity: {
        type: DataTypes.STRING,
      },
      spoken_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      medical_license_number: {
        type: DataTypes.STRING,
      },
      years_of_experience: {
        type: DataTypes.INTEGER,
      },
      specialities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('professionals')
  }
}