const mongoose = require('mongoose');

const guessSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstCorrectAnswer: { type: Number, default: 0 },
  totalAnswers: { type: Number, default: 0 },
});

const Guess = mongoose.model('Guess', guessSchema);

module.exports = Guess;
