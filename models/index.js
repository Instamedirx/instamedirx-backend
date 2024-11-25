// models/index.js
const User = require('./user')
const Certification = require('./certification')
const Degree = require('./degree')
const Role = require('./role')
const Professional = require('./professional')

User.belongsTo(Role)
Role.hasMany(User)

User.hasOne(Professional)
Professional.belongsTo(User)

Professional.hasMany(Certification)
Professional.hasMany(Degree)
Certification.belongsTo(Professional)
Degree.belongsTo(Professional)


module.exports = {
  User,
  Certification,
  Degree,
  Professional,
  Role
}