const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 5 },
});

var User = mongoose.model('users', userSchema)

module.exports = User;