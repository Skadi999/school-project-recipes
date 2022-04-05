const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 5 },
});

userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 12)
  }
  next()
})

var User = mongoose.model('users', userSchema)

module.exports = User;