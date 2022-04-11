const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let recipeSchema = new Schema({
  name: { type: String, required: true, minlength: 4 },
  description: String,
  imageURL: {
    type: String,
    required: true,
    match: [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
     'Please fill a valid URL']
  },
  timeInMin: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  author: {type: String, required: true}
});

var Recipe = mongoose.model('recipes', recipeSchema);

module.exports = Recipe;