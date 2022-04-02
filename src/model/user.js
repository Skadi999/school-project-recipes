const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

var User = mongoose.model('users', userSchema);

module.exports = User;