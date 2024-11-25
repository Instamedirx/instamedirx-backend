// models/index.js
const User = require('./user')
const Certification = require('./certification')
const Degree = require('./degree')
const Role = require('./role')
const Professional = require('./professional')
const SocialAuth = require('./socialAuth')
const { Token } = require('./token')

User.belongsTo(Role)
Role.hasMany(User)

User.hasOne(Professional)
Professional.belongsTo(User)

Professional.hasMany(Certification)
Professional.hasMany(Degree)
Certification.belongsTo(Professional)
Degree.belongsTo(Professional)

User.hasMany(SocialAuth)
SocialAuth.belongsTo(User)

User.hasMany(Token)
Token.belongsTo(User)

module.exports = {
  User,
  Certification,
  Degree,
  Professional,
  Role,
  SocialAuth,
  Token
}