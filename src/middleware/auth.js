const session = require('express-session')
const async = require('hbs/lib/async')
const Recipe = require('../model/recipe')
const User = require('../model/user')


const authenticate = async (req, res, next) => {
  res.locals.user = req.session.user
  return next();
}

module.exports = authenticate;