const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = require('./config')

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
})

// const runMigrations = async () => {
//   const migrator = new Umzug({
//     migrations: {
//       glob: 'migrations/*.js'
//     },
//     context: sequelize.getQueryInterface(),
//     storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
//     logger: console
//   })

//   const migrations = await migrator.up()
//   console.log('Migrations up to date', {
//     files: migrations.map((mig) => mig.name),
//   })
// }

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}
  
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}


module.exports = { sequelize, connectToDatabase, rollbackMigration }