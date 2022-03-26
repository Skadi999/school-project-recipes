const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let recipeSchema = new Schema({
  name: { type: String, required: false },
  description: String,
  imageURL: { type: String, required: false },
  timeInMin: {
    type: Number,
    required: false,
    min: [0]
  },
  difficulty: {
    type: String,
    required: false,
    trim: true,
    enum: ['Easy', 'Moderate', 'Hard']
  },
  ingredients: { type: [String], required: false },
  steps: { type: [String], required: false }
});

var Recipe = mongoose.model('recipes', recipeSchema);

module.exports = Recipe;